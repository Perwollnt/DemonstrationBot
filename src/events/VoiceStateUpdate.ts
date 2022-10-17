import { VoiceState } from "discord.js";

export class VoiceStateUpdate {
    do(oldMember: VoiceState, newMember: VoiceState) {
        if(oldMember.channel?.name.includes("temproom-")) {
            if(oldMember.channel?.members.size! < 1) {
                if(oldMember.channel?.name.includes("temproom-")) {
                    if(oldMember.channel.deletable) oldMember.channel?.delete();
                }
            }
        }
    }   
}