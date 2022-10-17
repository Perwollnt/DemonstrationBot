import { MessageReaction, PartialMessageReaction, User, PartialUser, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle, Awaitable } from "discord.js";
import { DatabaseManager } from "../helpers/DatabaseManager";
import { GetStuff } from "../helpers/GetStuff";
import { SetStuff } from "../helpers/SetStuff";
import { commandsconfig } from "../settings/commands";
import { messagesconfig } from "../settings/messages";
import { systemsettings } from "../settings/system";

export class MessageReactionRemove {

    db = new DatabaseManager();
    public async do(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): Promise<any> {
        if(user.bot || user.id == GetStuff.bot.id) return;
        if(systemsettings.channels.selectors.role.indexOf(reaction.message.channel.id) == -1) return;
        const guildUser = reaction.message.guild?.members.cache.get(user.id) as GuildMember;

        const msgids = (await this.db.get(systemsettings.db.system)).reactmsgids;
        
        let leta = false;
        for(let e of msgids) {
            if(e == reaction.message.id) leta = true;
        }
        if(!leta) return;

        for(let e of commandsconfig.roleselect.roles) {
            if(e.emote == reaction.emoji.name) {
                guildUser.roles.remove(e.roleid);
                
                
                
                const dbuser = (await this.db.get(systemsettings.db.path.replaceAll("%user", user.id)));
                if(!dbuser) {
                    await SetStuff.setDefaultData(guildUser.id);
                    return user.send(`${messagesconfig.user.removed.role.replaceAll("%role", e.text)}`);
                }

                if(dbuser.sendmessages) {

                    const msg = `${messagesconfig.user.removed.role.replaceAll("%role", e.text)}`;

                    const c = new ActionRowBuilder<ButtonBuilder>();
                    c.addComponents(
                        new ButtonBuilder()
                        .setCustomId("settings-disable-dms")
                        .setLabel(messagesconfig.buttons.disable.dm.messages)   
                        .setStyle(ButtonStyle.Danger)  
                    )


                    return user.send({ content: msg, components: [c] })
                }
                
            }
        }
        return;
    }
}