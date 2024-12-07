import { TruthBot } from './character/truthBot';
import { Client, IAgentRuntime } from "@ai16z/eliza";
import { TelegramClient } from "./telegramClient.ts";

async function main() {
  const bot = new TruthBot();

  // Use Discord as the client
  const client = new TelegramClient({
    token: process.env.DISCORD_TOKEN,
    bot: bot
  });

  await client.start();
}

main().catch(console.error);