<h1 align="center">
    CrowBot Remade - It's a multipurpose bot which is a remade of a py discord bot which is selled for 5e but this is in js !
</h1>

<p align="center">
	CrowBot Remade is in french so you will need to translate the bot.
</p>

<p align="center">
	<a href="https://deno.land" target="_blank">
    	<img src="https://img.shields.io/badge/Version-1.0.0-7DCDE3?style=for-the-badge" alt="Version">
</p>
	
# INFO
```
discord-buttons no longer work!
use discord-buttons-fixed
```

# Setup
	
You can setup `CrowBot Remade` by simply opening your terminal/console and pasting in the following command:
```
npm i
```
After that go in `config.json` and complete with your token, id etc.

After you've done all that, you can finally run CrowBot Remade by typing in the following command:
```
node index.js
```


# Credits
```
Made by Wassim
Leak by github.com/whoisbaby

```

### Contribution;
###### All contributions are accepted, just open an issue / pull request and i will get back to you as soon as i can.
###### If you want to help me you can just star the repo and fork it.
 
# Discord Multi-Bot Starter (conforme aux règles Discord)

Ce projet démarre N bots Discord (discord.js v14) à partir de tokens fournis par vous, et envoie un récapitulatif via un webhook. Aucune création automatique d'apps, reset ou partage de tokens n'est effectuée.

## Prérequis
- Node.js 18+
- Créez vos applications/bots sur le Portail Dev Discord et copiez leurs tokens.
- Activez manuellement les intents nécessaires pour chaque bot dans le Portail Dev.

## Installation
```bash
npm i
cp .env.example .env
# Editez .env et mettez vos tokens et l'URL du webhook
```

## Lancement
```bash
npm start
```

Au démarrage, saisissez le nombre de bots à lancer (<= au nombre de tokens saisis). Un embed récap sera envoyé au webhook.

## Sécurité
- Ne partagez jamais vos tokens.
- Ce projet ne logge ni n’envoie les tokens.
 
