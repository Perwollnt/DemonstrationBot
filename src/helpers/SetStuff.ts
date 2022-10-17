import { systemsettings } from "../settings/system";
import { DatabaseManager } from "./DatabaseManager";

const db = new DatabaseManager();

export class SetStuff {
    
    

    public static async setDefaultData(user: string) {
        console.log("set default data triggered");
        await db.set(systemsettings.db.path.replaceAll("%user", user), {
            sendmessages: true,
            voicechannel: null,
        });
        return "";
    }
    public static async setDefaultSystemData() {
        console.log("set default data triggered");
        await db.set(systemsettings.db.system, {
            reactmsgids: [],
        });
        return "";
    }
    
}