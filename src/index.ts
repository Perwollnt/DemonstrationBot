// < Imports >
import { BotClient } from "./client";
import { GetStuff } from "./helpers/GetStuff";

//Start bot
new BotClient(GetStuff.bot.token);
