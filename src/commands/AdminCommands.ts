import { SlashCommandBuilder, Client, CommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";
import { config } from "dotenv";
import { commandsconfig } from "../settings/commands";

import { DatabaseManager } from "../helpers/DatabaseManager";
import { systemsettings } from "../settings/system";
import { SetStuff } from "../helpers/SetStuff";

config();


export class AdminCommand implements SlashCommandInterface {


    db = new DatabaseManager();

    info: CommandInfo = {
        name: "admin",
        description: "do admin stuff",
        example: "admin ticketsetup",
        usage: "admin [<subcommand>] <args>"
    };

    builder = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description)
    .addSubcommand(sc => sc.setName("help").setDescription("Help with the other commands"))
    .addSubcommand(sc => sc.setName("roleselect").setDescription("Help with the other commands"))

    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {
        switch (interaction.options.data[0].name) {
            case "help":
                return interaction.reply("TODO: make help message (finished in other bot just copy paste)")
            case "roleselect":
                return this.roleselect(interaction);
            default:
                break;
        }
    }

    private async roleselect(interaction: CommandInteraction) {
        let msg = "";
        const embed = new EmbedBuilder()
        .setTitle(commandsconfig.roleselect.embeds.selector.title)
        .setColor(`#${systemsettings.embedcolor.replaceAll("#", "")}`);
        for(let e of commandsconfig.roleselect.roles) {
            msg += commandsconfig.roleselect.embeds.selector.description.replaceAll("%e.e", e.emote).replaceAll("%e.name", e.text).replaceAll("%e.id", e.roleid) + "\n"
        }
        embed.setDescription(msg);

        

        interaction.channel?.send({ embeds: [embed] }).then(async msg => {
            for(let e of commandsconfig.roleselect.roles) {
                msg.react(e.emote);

            }
            const c = await this.db.get(systemsettings.db.system)
            if(!c) await SetStuff.setDefaultSystemData();
            let e = c.reactmsgids as string[];
            try {
                e.push(msg.id);
            } catch (error) {
                e = [msg.id]
            }
            this.db.set(systemsettings.db.system, {
                reactmsgids: e,
            })
        });
    }
    
}