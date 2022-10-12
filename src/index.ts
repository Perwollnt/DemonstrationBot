// < Imports >
import { BotClient } from "./client";
import { config } from "dotenv";

// Dotenv config
config();

//Start bot
new BotClient(process.env.TOKEN!);
