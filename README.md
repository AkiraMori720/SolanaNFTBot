# Solana NFT Bot

Solana NFT bot is a helpful bot for your Solana NFT projects.

This project is sponsored by [milktoast.world](https://milktoast.world):
An NFT project that aims to spread happiness and cheer.

<img src="https://user-images.githubusercontent.com/90617759/139604005-addc968d-2193-4e7b-9ac9-86622672391b.png" width=100>


## Features
- [x] Notify discord channel on each purchase in marketplaces. 
- [x] [Support major marketplaces](#marketplace-support) 

<img width="508" alt="Screen Shot 2021-11-01 at 7 40 44 pm" src="https://user-images.githubusercontent.com/90617759/139645471-4b2aab1e-2fa2-4691-87ca-1707bc35b027.png">

## Running using docker

### Requirement
* [docker](https://www.docker.com/products/docker-desktop) >= v20.10

### Instructions

#### Run bot using docker compose in the terminal

In the terminal, run the following command with `{placeholder}` replaced with your own configuration:

```
docker run --name nftbot \
 -d -p 4000:4000 -e DISCORD_BOT_TOKEN={placeholder} \
 -e SUBSCRIPTION_DISCORD_CHANNEL_ID={placeholder} \
 -e SUBSCRIPTION_MINT_ADDRESS={placeholder} \
 milktoastlab/solananftbot
```
See [here](#configurable-environments) for more detail

View logs
```
docker logs ntfbot
```

## Running in development
### Requirement
* Node >= 16.6
* Yarn

### Instructions

#### 1. Install dependencies
```
yarn install
```

#### 2. Update .env with your secrets

Follow the instructions [here](#configurable-environments)

#### 3. Run the server
```
yarn dev
```

## Configurable environments

Here are a list of environments you need to configure before running the NFT bot.

```sh
# Replace this with your RPC
SOLANA_RPC=https://explorer-api.mainnet-beta.solana.com/
# Discord bot secret
DISCORD_BOT_TOKEN=
# The discord channel to notify
SUBSCRIPTION_DISCORD_CHANNEL_ID=
# Mint address to watch for sales
SUBSCRIPTION_MINT_ADDRESS=
```
https://github.com/milktoastlab/SolanaNFTBot/blob/main/.env

### Variable breakdowns

#### DISCORD_BOT_TOKEN
This is your discord bot secret.
If you don't have a discord bot yet, you can create one following the instructions here:
https://discordpy.readthedocs.io/en/stable/discord.html

Make sure your bot has the required permissions:
* View channels
* Read/Send messages
* Send messages
* Embed links

<img width="827" alt="Screen Shot 2021-10-31 at 9 25 31 am" src="https://user-images.githubusercontent.com/90617759/139560537-e0420217-25d7-4538-81cc-d53422c24db9.png">

#### SUBSCRIPTION_DISCORD_CHANNEL_ID
This is the ID of the discord channel you want to send notifications to.
You will need to enable developer mode have access the channel IDs.
Here are the instructions:
https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-

#### SUBSCRIPTION_MINT_ADDRESS
This is the address that you want the Solana NFT bot to watch for notifications.
Ideally, it's the "Update Authority" address.

<img width="587" alt="Screen Shot 2021-10-31 at 9 30 56 am" src="https://user-images.githubusercontent.com/90617759/139560515-efd2f584-8f98-4337-a9ad-704b18581b22.png">
OR one of the creator addresses:
<img width="324" alt="Screen Shot 2021-11-12 at 6 16 31 pm" src="https://user-images.githubusercontent.com/90617759/141426468-fcf7c522-4480-4a4e-b1e9-c0cbed3f4f10.png">

_Note: Avoid personal addresses because it could detect unwanted sales._


## Marketplace support

- [x] [Magic Eden](https://magiceden.io/)
- [x] [Solanart](http://solanart.io/)
- [x] [Digital Eyes](https://digitaleyes.market/)
- [x] [Alpha Art](https://alpha.art/)
- [ ] [Solsea](https://solsea.io/)

### Adding new marketplace

SolanaNFTBot aim to support as many marketplaces are possible. 
Here is the instruction on how you can add support to other marketplaces.

#### 1. Add a new marketplace config
Use `src/lib/marketplaces/digitalEyes.ts` as example

#### 2. Write a test for the marketplace
Use `src/lib/marketplaces/digitalEyes.test.ts` as example

#### 3. Add the new marketplace to the existing list 
`src/lib/marketplaces/marketplaces.ts`

## Support

If you have any questions or feedback, feel free to jump into our discord #dev-talk channel and have a chat.
https://discord.com/invite/GYxur2tvzP
