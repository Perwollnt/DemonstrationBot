export const systemsettings = {
    embedcolor: "#36393F",
    defaults: {
        image: "https://ih1.redbubble.net/image.298152841.4153/raf,750x1000,075,t,101010:01c5ca27c6.u5.jpg",
        url: "https://skyreflect.hu",
        string: "ERR",
        boolean: true,
    },
    logmessage: "$%type% $%message% | %sender% => lvl %level%", // $ = color char || %type% = SYSTEM | EVENT | ERROR || %level% = 0, 1, 2, 3, 4 || %message% = message, %sender% = the code snippet that sent the log
    logSettings: {
        levelcolor: {
            // [!!] http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html [!!]
            0: "\u001b[37m", //white
            1: "\u001b[32m", //green
            2: "\u001b[33m", //yellow
            3: "\u001b[35m", //magenta
            4: "\u001b[31m" //red
        },
        types: {
            SYSTEM: "\u001b[2;30m[\u001b[0m\u001b[2;33mSYS\u001b[0m\u001b[2;30m]\u001b[0m",
            EVENT: "\u001b[2;30m[\u001b[0m\u001b[2;33m\u001b[2;32mEVENT\u001b[0m\u001b[2;33m\u001b[0m\u001b[2;30m]\u001b[0m",
            ERROR: "\u001b[2;30m[\u001b[0m\u001b[2;31mERR\u001b[0m\u001b[2;30m]\u001b[0m",
        }
    },
    minecraft: {
        ip: "217.144.54.222",
        port: "8061",
        show: ["online", "players"],
    },
    debug: {
        enabled: false,
        fakeBOOLvalue: false, // true | false
        fakeStringvalue: "rák",
    },
    channels: {
        welcome: "906552190980718623",
        goodbye: "906552190980718623",
        log: {
            system: "970342383503937548",
            other: "970342383503937548",
        },
        selectors: {
            role: ["1029084882774790235", "1029361283490926652"]
        }
    },
    modules: {
        chatbot: true
    },
    blacklisted_exec_strings: [
        "token", 
        ".env", 
        "settings", 
        "config", 
        "key.json", 
        "key.", 
        "config.json",
        "shutdown",
        "stop",
        "exit",
        "leave",
        "rm -rf",
        "rm"
    ],
    db: {
        path: "Dembot/%user", //%user = user's id
        system: "Dembot/system"
    }
}