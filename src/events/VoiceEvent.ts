import { ChannelType, PermissionOverwrites, VoiceChannel, VoiceState } from "discord.js";
import { DatabaseManager } from "../helpers/DatabaseManager";
import { SetStuff } from "../helpers/SetStuff";
import { eventsettings } from "../settings/events";
import { systemsettings } from "../settings/system";

export class VoiceEvent {

    db = new DatabaseManager();


    public async join(oldState: VoiceState, newState: VoiceState) {
        if(newState.channelId === eventsettings.voicejoin.generatorroom) {
            const dbuser = await this.db.get(systemsettings.db.path.replaceAll("%user", newState.member!.id));
            if(!dbuser) await SetStuff.setDefaultData(newState.member!.id);
            
            newState.guild.channels.create({
                name: `temproom-${newState.member!.id}`,
                parent: newState.channel?.parentId,
                type: ChannelType.GuildVoice,
                permissionOverwrites: [
                    {
                        id: newState.member!.id!,
                        allow: [ "Connect", "CreateInstantInvite", "DeafenMembers", "MuteMembers", "PrioritySpeaker", "Speak", "Stream", "UseEmbeddedActivities", "ViewChannel", "ManageChannels", "ManageRoles", "MoveMembers", "SendMessages", "EmbedLinks", "AttachFiles", "AddReactions", "UseExternalEmojis", "UseExternalStickers", "ReadMessageHistory", "ManageMessages", "SendTTSMessages", "UseApplicationCommands"]
                    },
                    {
                        id: newState.guild.id,
                        deny: [ "ViewChannel" ]
                    }
                ]
            }).then((ch: VoiceChannel) => {
                newState.member!.voice.setChannel(ch.id);
                this.db.set(systemsettings.db.path.replaceAll("%user", newState.member!.id), {
                    voicechannel: ch.id,
                });
            });

            
        }
    }
    public async leave(oldState: VoiceState, newState: VoiceState) {
        const user = oldState.guild.members.cache.get(oldState.channel?.name.split("-")[1]!);
        const perm: { id: string, allow: string, deny: string }[] = [];
        oldState.channel?.permissionOverwrites.cache.forEach(ov => {
            const c =  {
                id: ov.id,
                allow: `${ov.allow.bitfield}`,
                deny: `${ov.deny.bitfield}`,
            }
            perm.push(c);
        });

        this.db.set(systemsettings.db.path.replaceAll("%user", newState.member!.id), {
            channelsettings: perm,
        });

        if(oldState.channel?.members.size! < 1) {
            if(oldState.channel?.name.includes("temproom-")) {
                if(oldState.channel.deletable) oldState.channel?.delete();
            }
        }
    }
}