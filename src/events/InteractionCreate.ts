import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, Interaction, SelectMenuInteraction } from "discord.js";
import { commands } from "../client";
import { DatabaseManager } from "../helpers/DatabaseManager";
import { Logger } from "../helpers/Logger";
import { messagesconfig } from "../settings/messages";
import { systemsettings } from "../settings/system";

const logger = new Logger();

export class InteractionCreate {

    db = new DatabaseManager();

    async do(interaction: Interaction) {
        if(interaction.isCommand()) this.handleCommandInteractions(interaction);
        if(interaction.isButton()) this.handleButtonInteractions(interaction);
        if(interaction.isSelectMenu()) this.handleMenuInteractions(interaction);
    }

    private async handleCommandInteractions(interaction: CommandInteraction) {
        for(let e of commands) {
            if(interaction.commandName == e.info.name) return e.onTriggered(interaction.client, interaction);
        }
        interaction.reply("Interaction is not registered (or a bigger problem)");
        logger.log( { LEVEL: 4, MESSAGE: `Interaction (${interaction.commandName}) not found!`, SENDER: "InteractionCreate.ts:19", TYPE: "ERROR" } );
    }

    private async handleButtonInteractions(interaction: ButtonInteraction) {
        switch (interaction.customId) {
            case "settings-disable-dms":
                this.db.set(systemsettings.db.path.replaceAll("%user", interaction.user.id), { sendmessages: false });
                const c = new ActionRowBuilder<ButtonBuilder>();
                    c.addComponents(
                        new ButtonBuilder()
                        .setCustomId("settings-enable-dms")
                        .setLabel(messagesconfig.buttons.enable.dm.messages)   
                        .setStyle(ButtonStyle.Danger)  
                    )
                interaction.reply({ content: messagesconfig.user.disabled.dm.messages, components: [c] })
                break;
            case "settings-enable-dms":
                this.db.set(systemsettings.db.path.replaceAll("%user", interaction.user.id), { sendmessages: true });
                interaction.reply(messagesconfig.user.enabled.dm.messages);
                break;
            default:
                break;
        }
    }

    private async handleMenuInteractions(interaction: SelectMenuInteraction) {

    }
}