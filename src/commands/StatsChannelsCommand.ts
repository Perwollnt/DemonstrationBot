import { SlashCommandBuilder, Client, CommandInteraction, CacheType } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";
import { config } from "dotenv";

import { DatabaseManager } from "../helpers/DatabaseManager";
import { LocalizationSettings } from "../settings/localizations";

config();


export class StatsCommand implements SlashCommandInterface {


    db = new DatabaseManager();

    info: CommandInfo = {
        name: "stats",
        description: "Create statistics",
        example: "/stats add #randomchannel usercount",
        usage: "/stats [<add | edit | remove>] [<channel>] <args>"
    };

    builder = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description)
    .addSubcommand(sc => sc.setName("add").setDescription("add a statistic to a channel").setDescriptionLocalizations(LocalizationSettings.commands.stats.subcommands.add.data)
        .addChannelOption(co => co.setName("channel").setDescription("The channel you want me to edit").setDescriptionLocalizations(LocalizationSettings.commands.stats.subcommands.add.channel))
        .addStringOption(so => so.setName("statistic").setDescription("choose a statistic").setDescriptionLocalizations(LocalizationSettings.commands.stats.subcommands.add.statistic)
            .addChoices(
                {
                    name: "usercount",
                    value: "usercount",
                    name_localizations: { hu: "tagszám" }
                },
                {
                    name: "channelcount",
                    value: "channelcount",
                    name_localizations: { hu: "csatornák száma" }
                },
                {
                    name: "botcount",
                    value: "botcount",
                    name_localizations: { hu: "Botok száma" }
                },
                {
                    name: "pureusercount",
                    value: "pureusercount",
                    name_localizations: { hu: "Emberi felhasználók száma" }
                },

            ))
        .addStringOption(so => so.setName("format").setDescription("The format you want me to use (placeholders: %stat%)").setDescriptionLocalizations(LocalizationSettings.commands.stats.subcommands.add.format))
            )

    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {
        /*
        {
            name: 'add',
            type: 1,
            options: [
                {
                    name: 'channel',
                    type: 7,
                    value: '1029096401684144148',
                    channel: [VoiceChannel]
                },
                { name: 'statistic', type: 3, value: 'channelcount' },
                { name: 'format', type: 3, value: 'Csatornák száma: %stat%' }
            ]
        }
        */
        
        let statdata = {
            statistic: "",
            format: "",
            channel: "",
            guild: interaction.guildId,

        }

        const c = interaction.options.data[0];
        for(let e of c.options!) {
            if(e.name.includes("channel")) statdata.channel = e.value as string;
            
            if(e.name.includes("statistic")) statdata.statistic = e.value as string;
            
            if(e.name.includes("format")) statdata.format = e.value as string;
            
        }
        console.log(statdata);
        
    }
    
}