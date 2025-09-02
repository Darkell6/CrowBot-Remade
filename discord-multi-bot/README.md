# discord-multi-bot

Projet légal: lance plusieurs bots Discord (officiels) avec discord.js v14. Pas de selfbot.

## Prérequis
- Node.js 18+

## Installation
```
npm install
```

## Configuration
1. Créez vos applications et bots sur le portail développeurs Discord et copiez leurs tokens.
2. Créez un fichier `.env` (ou copiez `.env.example`) et renseignez:
```
DISCORD_TOKENS=token1,token2,token3
```

## Lancement
- Interactif:
```
npm start
```
- Non interactif (CI):
```
BOTS_COUNT=2 DISCORD_TOKENS=token1,token2 npm start
```