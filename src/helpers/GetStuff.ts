import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js";

import { config } from "dotenv";
config();

export class GetStuff {
    public static getClient() {
        return new Client({
            intents: this.bot.intents,
            partials: this.bot.partials,
            presence: { activities: [{ name: "Youtube and chill", type: ActivityType.Streaming }] },
            allowedMentions: { repliedUser: false, parse: [ "roles", "users" ] },
        });
    }

    static getIntents() {
        const temp: any[] = [];

        Object.keys(GatewayIntentBits).map((val: any) => {
            if(isNaN(val)) return val;
        }).forEach((c: string) => {
            if(c) temp.push(c);
        });

        return temp;
    }

    public static bot = {
        id: process.env.BOTID!,
        token: process.env.TOKEN!,
        partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Reaction, Partials.ThreadMember, Partials.User],
        intents: this.getIntents(),
    }
    
}