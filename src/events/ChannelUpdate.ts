import { Channel, GuildChannel } from "discord.js";

export class channelUpdate {
    do(oldcha: Channel, newcha: Channel) {
        let oldch = (oldcha as GuildChannel);
            let newch = (newcha as GuildChannel);
            if(oldch.name.includes("temproom-")) {
                newch.setName(oldch.name);
            }
    }
}