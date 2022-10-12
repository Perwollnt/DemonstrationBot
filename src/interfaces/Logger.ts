export interface LoggerInterface {
    LEVEL: 0 | 1 | 2 | 3 | 4,
    TYPE: "SYSTEM" | "EVENT" | "ERROR",
    MESSAGE: string,
    SENDER: string
}