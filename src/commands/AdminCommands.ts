import { SlashCommandBuilder, Client, CommandInteraction, CacheType, ChannelType, GuildChannel, CommandInteractionOption, REST } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";
import { messagesconfig } from "../settings/messages";
import { config } from "dotenv";
import { commandsconfig } from "../settings/commands";

config();


export class AdminCommand implements SlashCommandInterface {

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
        for(let e of commandsconfig.roleselect.roles) {
            msg += `${e.emote} : ${e.text}\n`;
        }

        interaction.channel?.send(msg).then(msg => {
            for(let e of commandsconfig.roleselect.roles) {
                msg.react(e.emote);
            }
        });
    }
    
}