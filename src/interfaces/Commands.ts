import { Client, CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export interface SlashCommandInterface {
    info: CommandInfo,
    builder: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder,
    onTriggered(client: Client, interaction: CommandInteraction): any,
}

export interface CommandInfo {
    name: string,
    description: string,
    usage: string,
    example: string,
}

export interface ActivitesInterface {
    name: string,
    id: string,
}