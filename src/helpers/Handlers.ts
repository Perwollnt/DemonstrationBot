import { Client } from "discord.js";
import { SlashCommandInterface } from "../interfaces/Commands";
import { REST } from '@discordjs/rest';
import { config } from "dotenv";
import { Routes } from 'discord-api-types/v10';

config();

export class Handlers {
    static async command(client: Client, commands: Array<SlashCommandInterface>): Promise<void> {
        console.log("Started refreshing application (/) commands.");
        const registercommands : any = [];
        commands.forEach(c => {
            registercommands.push(c.builder);
            console.log(`Registered command: ${c.info.name}`);
        });
        const rest = new REST({version: '9'}).setToken(process.env.TOKEN!);
        await rest.put( Routes.applicationCommands(process.env.BOTID!),
        { body: registercommands } 
        );
        console.log("✔ Successfully reloaded application (/) commands.");
    }
}