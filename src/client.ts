import { Client, Interaction, Message, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import { ActivityCommand } from "./commands/ActivityCommand";
import { AdminCommand } from "./commands/AdminCommands";
import { InteractionCreate } from "./events/InteractionCreate";
import { MessageReactionAdd } from "./events/MessageReactionAdd";
import { MessageReactionRemove } from "./events/MessageReactionRemove";
import { GetStuff } from "./helpers/GetStuff";
import { Handlers } from "./helpers/Handlers";
import { SlashCommandInterface } from "./interfaces/Commands";


const client = GetStuff.getClient();

export const commands: Array<SlashCommandInterface> = [
    //new xyzcommand();
    new ActivityCommand(),
    new AdminCommand(),
];

Handlers.command(client, commands);

export class BotClient {

    interactionHandler = new InteractionCreate();
    reactionHandler = {
        add: new MessageReactionAdd(),
        remove: new MessageReactionRemove(),
    }

    constructor(token: string) {
        client.login(token);
        client.on("ready", (client: Client) => console.log("READY!", client.user?.username));
        client.on("interactionCreate", (int: Interaction) => this.interactionHandler.do(int));
        client.on("messageCreate", (msg: Message) => console.log("MESSAGE!", client.user?.username));
        client.on("messageReactionAdd", (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => this.reactionHandler.add.do(reaction, user));
        client.on("messageReactionRemove", (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => this.reactionHandler.remove.do(reaction, user));
    }
}