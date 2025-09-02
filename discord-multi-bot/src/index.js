import 'dotenv/config';
import inquirer from 'inquirer';
import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';

async function resolveBotsCount() {
  const envCount = Number.parseInt(process.env.BOTS_COUNT ?? '', 10);
  if (Number.isInteger(envCount) && envCount > 0 && envCount <= 10) {
    return envCount;
  }
  const { botsCount } = await inquirer.prompt([
    {
      type: 'number',
      name: 'botsCount',
      message: 'Combien de bots voulez-vous lancer ? (1-10)',
      default: 1,
      validate: (v) => Number.isInteger(v) && v > 0 && v <= 10 ? true : 'Entrez un entier 1-10'
    }
  ]);
  return botsCount;
}

function buildClients(count) {
  const clients = [];
  for (let i = 0; i < count; i += 1) {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.Channel]
    });
    clients.push(client);
  }
  return clients;
}

async function loginClients(clients, tokens) {
  const used = tokens.slice(0, clients.length);
  if (used.length < clients.length) {
    throw new Error(`Pas assez de tokens: ${used.length}/${clients.length}`);
  }
  await Promise.all(
    used.map((token, idx) => clients[idx].login(token.trim()))
  );
}

function attachBasicHandlers(client, index) {
  client.once(Events.ClientReady, (c) => {
    console.log(`Bot #${index + 1} connecté: ${c.user.tag}`);
  });
  client.on(Events.Error, (err) => {
    console.error(`Erreur bot #${index + 1}:`, err?.message || err);
  });
  client.on(Events.ShardError, (err) => {
    console.error(`ShardError bot #${index + 1}:`, err?.message || err);
  });
}

async function main() {
  const botsCount = await resolveBotsCount();
  const tokensEnv = process.env.DISCORD_TOKENS || '';
  const tokens = tokensEnv.split(',').map(t => t.trim()).filter(Boolean);

  const clients = buildClients(botsCount);
  clients.forEach((c, idx) => attachBasicHandlers(c, idx));

  await loginClients(clients, tokens);
  console.log('Tous les bots ont été connectés. Appuyez sur Ctrl+C pour quitter.');
}

main().catch((err) => {
  console.error('Echec au lancement:', err);
  process.exitCode = 1;
});