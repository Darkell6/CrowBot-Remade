import 'dotenv/config';
import { Client, GatewayIntentBits, Partials, EmbedBuilder, WebhookClient } from 'discord.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const tokensEnv = (process.env.BOT_TOKENS || '').split(',').map(t => t.trim()).filter(Boolean);
const webhookUrl = process.env.WEBHOOK_URL || '';

if (tokensEnv.length === 0) {
  console.error('Aucun token dans BOT_TOKENS. Ajoutez-les dans .env (séparés par des virgules).');
  process.exit(1);
}

const rl = readline.createInterface({ input, output });

async function promptNumber(question) {
  const raw = await rl.question(question);
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0) throw new Error('Veuillez entrer un entier positif.');
  return n;
}

function createClient() {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
  });
}

async function loginClient(token, label) {
  const client = createClient();

  return new Promise(resolve => {
    let resolved = false;

    client.once('ready', () => {
      if (resolved) return;
      resolved = true;
      resolve({
        label,
        ok: true,
        tag: client.user?.tag || 'inconnu',
        id: client.user?.id || 'inconnu',
        client
      });
    });

    client.on('error', (err) => {
      if (resolved) return;
      resolved = true;
      resolve({ label, ok: false, error: String(err), client: null });
    });

    client.login(token).catch(err => {
      if (resolved) return;
      resolved = true;
      resolve({ label, ok: false, error: String(err), client: null });
    });
  });
}

async function sendWebhookSummary(webhookUrl, results) {
  if (!webhookUrl) {
    console.warn('WEBHOOK_URL manquant: le récap ne sera pas envoyé.');
    return;
  }
  const webhook = new WebhookClient({ url: webhookUrl });

  const fields = results.map(r => {
    if (r.ok) {
      return {
        name: `${r.label} • OK`,
        value: `Tag: ${r.tag}\nID: ${r.id}`,
        inline: false
      };
    }
    return {
      name: `${r.label} • ECHEC`,
      value: `Erreur: ${r.error || 'Connexion échouée'}`,
      inline: false
    };
  });

  const embed = new EmbedBuilder()
    .setTitle('Démarrage de bots')
    .setDescription('Récapitulatif des connexions')
    .addFields(fields)
    .setTimestamp(new Date());

  await webhook.send({ embeds: [embed] });
}

async function main() {
  try {
    const howMany = await promptNumber(`Combien de bots voulez-vous démarrer ? (max ${tokensEnv.length}) `);
    rl.close();

    if (howMany > tokensEnv.length) {
      console.error(`Vous avez demandé ${howMany} bots mais seulement ${tokensEnv.length} tokens fournis.`);
      process.exit(1);
    }

    const tokensToUse = tokensEnv.slice(0, howMany);
    const logins = tokensToUse.map((tok, idx) => loginClient(tok, `bot${idx + 1}`));
    const results = await Promise.all(logins);

    for (const r of results) {
      if (r.ok) {
        console.log(`[${r.label}] Connecté: ${r.tag} (${r.id})`);
      } else {
        console.log(`[${r.label}] ECHEC: ${r.error}`);
      }
    }

    await sendWebhookSummary(webhookUrl, results);

    const anyOnline = results.some(r => r.ok && r.client);
    if (!anyOnline) {
      console.log('Aucun bot en ligne. Fin du script.');
      process.exit(1);
    } else {
      console.log('Bots en ligne. Ctrl+C pour quitter.');
    }
  } catch (err) {
    rl.close();
    console.error('Erreur:', err.message || err);
    process.exit(1);
  }
}

main();



