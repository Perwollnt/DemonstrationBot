export const messagesconfig = {
    user: {
        is: {
            not: {
                in: {
                    a: {
                        channel: "Kérlek csatlakozz egy hangcsatornához!",
                        stage_channel: "Kérlek csatlakozz egy stage csatornához!"
                    }
                }
            }
        },
        got: {
            role: "I gave you the role %role!" //%role = role name
        },
        removed: {
            role: "I took the role %role from you!", //%role = role name
        },
        disabled: {
            dm: {
                messages: "értesítések kikapcsolva!",
            }
        },
        enabled: {
            dm: {
                messages: "értesítések bekapcsolva!",
            }
        },
        rolled: {
            dice: "You rolled the dice!..... And rolled a **%number** *(sides: %sides)*", //%number = rolled number, %sides = number given by the player
        },
        channel: {
            not: {
                same: {
                    as: {
                        bot: "Kérlek vagy húzz be magadhoz vagy lépj be a csatornámba!"
                    }
                }
            }
        }
    },
    bot: {
        could: {
            not: {
                join: {
                    channel: "I could not join your voice channel."
                },
                find: {
                    music: "❌ | Track not found!"
                }
            }
        }
    },
    commands: {
        activity: {
            message: "[A játék hozzáadva a szobádhoz](%link%). Katt a linkre, hogy játsz! (<#%channel.id%>)", //%link% activity link, %channel.id% = channelid
            defaults: {
                footer: "Perwollnt @ 2022 | \"Test\" bot",
            },
            880218394199220334: { //YOUTUBE TOGETHER
                desc: "Nézzetek youtube videókat együtt!",
                joinmessage: "Csatlakozz a mókához!",
            },
            814288819477020702: { //FISHINGTON
                desc: "Nézzetek youtube videókat együtt!",
                joinmessage: "Csatlakozz a mókához!",
            },
        }
    },
    buttons: {
        disable: {
            dm: {
                messages: "Disable messages",
            }
        },
        enable: {
            dm: {
                messages: "enable messages",
            }
        },
    }
}
