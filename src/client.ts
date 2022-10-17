import { BaseGuildVoiceChannel, Channel, ChannelType, Client, GuildAuditLogs, GuildChannel, GuildMember, GuildVoiceChannelResolvable, Interaction, Message, MessageReaction, NewsChannel, PartialMessageReaction, PartialUser, User, VoiceState } from "discord.js";
import { ActivityCommand } from "./commands/ActivityCommand";
import { AdminCommand } from "./commands/AdminCommands";
import { CounterCommand } from "./commands/CounterCommand";
import { DiceRollCommand } from "./commands/DiceRoll";
import { EconomyCommand } from "./commands/EconomyCommand";
import { StatsCommand } from "./commands/StatsChannelsCommand";
import { channelUpdate } from "./events/ChannelUpdate";
import { InteractionCreate } from "./events/InteractionCreate";
import { MessageReactionAdd } from "./events/MessageReactionAdd";
import { MessageReactionRemove } from "./events/MessageReactionRemove";
import { ReadyEvent } from "./events/ReadyEvent";
import { VoiceEvent } from "./events/VoiceEvent";
import { VoiceStateUpdate } from "./events/VoiceStateUpdate";
import { GetStuff } from "./helpers/GetStuff";
import { Handlers } from "./helpers/Handlers";
import { SlashCommandInterface } from "./interfaces/Commands";
import { eventsettings } from "./settings/events";



const client = GetStuff.getClient();


export const commands: Array<SlashCommandInterface> = [
    new ActivityCommand(),
    new AdminCommand(),
    new DiceRollCommand(),
    new EconomyCommand(),
    new CounterCommand(),
    new StatsCommand(),
];

Handlers.command(client, commands);

export class BotClient {
    private handlers = {
        interactionHandler: new InteractionCreate(),
        readyEvent: new ReadyEvent(),
        reactionHandler:{
            add: new MessageReactionAdd(),
            remove: new MessageReactionRemove(),
        },
        voice: new VoiceEvent(),
        channel: new channelUpdate(),
        voiceState: new VoiceStateUpdate(),
    }
    
    constructor(token: string) {
        client.login(token);
        // < Client ready event >
        client.on("ready", (client: Client) => this.handlers.readyEvent.do(client));
        // < CommandInteractions etc >
        client.on("interactionCreate", (int: Interaction) => this.handlers.interactionHandler.do(int));
        // < TODO: Message filtering >
        client.on("messageCreate", (msg: Message) => console.log("MESSAGE!", client.user?.username));
        // < Role selector >
        client.on("messageReactionAdd", (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => this.handlers.reactionHandler.add.do(reaction, user));
        // < ^^^ >
        client.on("messageReactionRemove", (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => this.handlers.reactionHandler.remove.do(reaction, user));
        // < Room generation stuff >
        client.on("voiceStateUpdate", (oldState: VoiceState, newState: VoiceState) => {
            if(newState.channelId === null) this.handlers.voice.leave(oldState, newState);
            if(oldState.channelId === null) this.handlers.voice.join(oldState, newState);
        });
        // < Prevent renaming temp rooms | TODO: make possible >
        client.on("channelUpdate", (oldcha: Channel, newcha: Channel) => this.handlers.channel.do(oldcha, newcha));
        // < Delete room if someone moves out instead of disconnect >
        client.on("voiceStateUpdate", (oldMember: VoiceState, newMember: VoiceState) => this.handlers.voiceState.do(oldMember, newMember));
    }
}