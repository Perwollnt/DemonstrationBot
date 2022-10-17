import { SlashCommandBuilder, Client, CommandInteraction, CacheType } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";
import { config } from "dotenv";

import { DatabaseManager } from "../helpers/DatabaseManager";

config();


export class CounterCommand implements SlashCommandInterface {


    db = new DatabaseManager();

    info: CommandInfo = {
        name: "counter",
        description: "counter channel stuff",
        example: "counter set <#6969696969>",
        usage: "counter [<subcommand>] <args>"
    };

    builder = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description)
    .addSubcommand(subCommand => subCommand.setName("set").setDescription("set counter channel").setDescriptionLocalizations({ hu: "Számláló csatorna beállítása" }))
    .addSubcommand(subCommand => subCommand.setName("unset").setDescription("unset counter channel").setDescriptionLocalizations({ hu: "Számláló csatorna törlése" }))

    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {
        console.log(interaction.options.data)
    }
    
}