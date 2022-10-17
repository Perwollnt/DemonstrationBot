import { Client } from "discord.js";
import { SlashCommandInterface } from "../interfaces/Commands";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Logger } from "./Logger";
import { GetStuff } from "./GetStuff";

export class Handlers {
    static async command(client: Client, commands: Array<SlashCommandInterface>): Promise<void> {
        Logger.console({ text: "Started refreshing application (/) commands.",level: "SYSTEM" })
        const registercommands : any = [];
        commands.forEach(c => {
            registercommands.push(c.builder);
            Logger.console({ text: `Added command: ${c.info.name}`, level: "LOG" })
        });
        const rest = new REST({version: '9'}).setToken(GetStuff.bot.token);
        await rest.put( Routes.applicationCommands(GetStuff.bot.id), { body: registercommands } );
        Logger.console({ text: "✔ Successfully reloaded application (/) commands.", level: "SYSTEM" })
    }
}