# discord-multi-bot

Ce projet lance plusieurs bots Discord officiels avec discord.js v14.

Important: n'utilisez pas de selfbot (interdit par Discord). Utilisez des bots créés dans le portail développeurs.

## Prérequis
- Node.js 18+

## Configuration
1. Créez vos applications et bots sur le portail développeurs Discord.
2. Copiez les tokens des bots et renseignez `.env` au format:

```
DISCORD_TOKENS=token1,token2,token3
```

## Lancement
```
npm start
```
Le script demande combien de bots lancer (1-10), puis connecte ce nombre de clients.
