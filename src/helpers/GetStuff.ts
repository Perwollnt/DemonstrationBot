import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js";

import { config } from "dotenv";
config();

export class GetStuff {
    public static getClient() {
        return new Client({
            intents: this.getIntents(),
            partials: this.getPartials(),
            presence: { activities: [{ name: "Beta dev build v0.0.3", type: ActivityType.Streaming }] },
            allowedMentions: { repliedUser: false, parse: [ "roles", "users" ] },
        });
    }

    public static getIntents() {
        const temp: any[] = [];

        Object.keys(GatewayIntentBits).map((val: any) => {
            if(isNaN(val)) return val;
        }).forEach((c: string) => {
            if(c) temp.push(c);
        });

        return temp;
    }

    public static getPartials() {
        return [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Reaction, Partials.ThreadMember, Partials.User];
    }

    public static getBotId() {
        return process.env.BOTID;
    }
    
}