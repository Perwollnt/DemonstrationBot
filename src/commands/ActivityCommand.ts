import { SlashCommandBuilder, Client, CommandInteraction, CacheType, ChannelType, GuildChannel, CommandInteractionOption, REST } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/Commands";
import { messagesconfig } from "../settings/messages";
import { config } from "dotenv";

config();


export class ActivityCommand implements SlashCommandInterface {

    info: CommandInfo = {
        name: "activity",
        description: "start an activity",
        example: "activity youtube_together",
        usage: "activity [<activityname>]"
    };

    builder: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description)
    .addStringOption(so => so.setName("activity_name").setDescription("description").setRequired(true).addChoices(
        { name: "Youtube together", value: "880218394199220334", name_localizations: { hu: "Youtube együtt" } },
        { name: "Fishington", value: "814288819477020702", name_localizations: { hu: "Horgász kalandok" } },
        { name: "Chess in the park", value: "832012774040141894", name_localizations: { hu: "Sakk" } },
        { name: "Betrayal", value: "773336526917861400", name_localizations: { hu: "Árulás" } },
        { name: "Word Snacks", value: "879863976006127627", name_localizations: { hu: "Szóáradat" } },
        { name: "Letter League", value: "879863686565621790", name_localizations: { hu: "defaultlettertile" } },
        { name: "Poker night", value: "755827207812677713", name_localizations: { hu: "Póker est" } },
        { name: "Checkers in the park", value: "832013003968348200", name_localizations: { hu: "Dáma" } },
        { name: "Putt party", value: "945737671223947305", name_localizations: { hu: "Minigolf" } },
        { name: "Putt party dev", value: "910224161476083792", name_localizations: { hu: "Minigolf dev" } },

    ));

    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {

        const member = await interaction.guild?.members.fetch(interaction.user.id);
        const userChannel = member?.voice.channel;
        if(!userChannel) return interaction.reply(messagesconfig.user.is.not.in.a.channel);
        if(userChannel.type == ChannelType.GuildStageVoice) return interaction.reply(messagesconfig.user.is.not.in.a.channel);
        const invite = `https://discord.gg/${await this.getInvite(userChannel, interaction.options.get("activity_name"))}`;
        return interaction.reply(messagesconfig.commands.activity.message.replaceAll("%link%", invite).replaceAll("%channel.id%", userChannel.id));

    }

    async getInvite(userChannel: GuildChannel, option: CommandInteractionOption<CacheType> | null): Promise<string> {
        const rest: any = new REST({ version: "8" }).setToken(process.env.TOKEN!);

        const res: any = await rest.post(`/channels/${userChannel.id}/invites`, {
            body: { max_age: 86400, max_uses: 0, target_application_id: option?.value, target_type: 2, temporary: false, validate: null, } 
            })
        return res.code;
    }
    
}