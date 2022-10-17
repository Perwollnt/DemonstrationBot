export class Logger {
    public static async console(message: LoggerInterface) {
        if(!message.level) return console.log(`\x1b[34m[SYS]: \x1b[37m${message.text}\x1b[39;49m`);
        switch (message.level) {
            case "ERROR":
                return console.log(`\x1b[31m[ERR]: ${message.text}\x1b[39;49m`);
            case "LOG":
                return console.log(`\x1b[36m[LOG]: \x1b[37m${message.text}\x1b[39;49m`);
            case "SYSTEM":
                return console.log(`\x1b[34;1m[SYS]: \x1b[37m${message.text}\x1b[39;49m`);
        }
    }
}

export interface LoggerInterface {
    text: string,
    level: "LOG" | "SYSTEM" | "ERROR"
}