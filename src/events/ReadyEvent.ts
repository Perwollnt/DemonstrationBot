import { Client } from "discord.js";
import { Logger } from "../helpers/Logger";

export class ReadyEvent {
    public async do(client: Client) {
        Logger.console({ level: "SYSTEM", text: `${client.user?.username} (${client.user!.id}) is ready! Serving ${client.users.cache.size} ${client.users.cache.size > 1 ? 'users' : 'user'} in ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? 'guilds' : 'guild'}!` })
        //TODO: make loading data automatic on system start!
    }
}