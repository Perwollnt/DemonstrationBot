import { LocalizationMap } from "discord.js"

export const LocalizationSettings: {
    commands: {
        stats: {
            subcommands: {
                add: {
                    data: LocalizationMap,
                    channel: LocalizationMap,
                    statistic: LocalizationMap,
                    format: LocalizationMap,
                }
            }
        }
    }
} = {
    commands: {
        stats: {
            subcommands: {
                add: {
                    data: { 
                        hu: "Statisztika hozzáadása a csatornához", 
                    },
                    channel: {
                        hu: "A csatorna amit szerkeszteni szeretnél",
                    },
                    statistic: {
                        hu: "Válassz egy statisztikát",
                    },
                    format: {
                        hu: "A csatorna nevének formátuma (Placeholder: %stat%)"
                    },
                },
            },
        },
    },
}