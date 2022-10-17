import { SlashCommandBuilder, Client, CommandInteraction, CacheType} from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";

import { DatabaseManager } from "../helpers/DatabaseManager";
import { EconomyInterface } from "../interfaces/Economy";

export class EconomyCommand implements SlashCommandInterface {


    db = new DatabaseManager();

    info: CommandInfo = {
        name: "economy",
        description: "economy commands",
        example: "economy mine",
        usage: "economy [<commands>]"
    };

    builder = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description);


    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {
        const user: EconomyInterface = {
            user: {
                balance: 11111,
                id: interaction.user.id,
                inventory: [
                    {
                        name: "pickaxe",
                        pieces: 3,
                    }
                ],
                name: interaction.user.username,
            }
        }
        console.log(user);
    }
    
}