import { SlashCommandBuilder, Client, CommandInteraction, CacheType } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";
import { config } from "dotenv";

import { DatabaseManager } from "../helpers/DatabaseManager";
import { messagesconfig } from "../settings/messages";

config();


export class DiceRollCommand implements SlashCommandInterface {


    db = new DatabaseManager();

    info: CommandInfo = {
        name: "dice",
        description: "roll the dice",
        example: "dice 16",
        usage: "dice [<sides>]"
    };

    builder = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description).addIntegerOption(io => io.setName("sides").setDescription("how may sides")
    .setDescriptionLocalization("hu", "hány oldala legyen?"));

    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {
        let data = interaction.options.get("sides") as { name: string, type: number, value: number };
        if(!data) data = { name: "sides", type: 4, value: 6, } 
        const rand = Math.floor(Math.random() * data.value);
        //%number = rolled number, %sides = number given by the player
        interaction.reply(messagesconfig.user.rolled.dice.replaceAll("%number", `${rand + 1}`).replaceAll("%sides", `${data.value}`));

    }
    
}