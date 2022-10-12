import { LoggerInterface } from "../interfaces/Logger";
import { systemsettings } from "../settings/system";


export class Logger {
    log(log: LoggerInterface ) {
        let msg = systemsettings.logmessage.replaceAll("%type%", systemsettings.logSettings.types[log.TYPE]).replaceAll("%message%", log.MESSAGE).replaceAll("%sender%", log.SENDER);
        msg = msg.replaceAll("%level%", systemsettings.logSettings.levelcolor[log.LEVEL] + log.LEVEL);
        msg = msg.replaceAll("$", systemsettings.logSettings.levelcolor[log.LEVEL]);
        console.log(msg + "\u001b[0m");
    }

    loghook(msg: string) {

    }
}