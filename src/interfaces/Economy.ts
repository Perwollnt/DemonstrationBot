export interface EconomyInterface {
    user: {
        name: string,
        id: string,
        balance: number,
        inventory: UserInventoryInterface[],
    }
}

export interface UserInventoryInterface {
    name: string,
    pieces: number,
}