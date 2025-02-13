//Inventory.ts
export interface IItem {
    name: string
    quantity: number
    rarity: string
}

export class item implements IItem {
    name: string
    quantity: number
    rarity: string

    constructor(name: string, quantity: number, rarity: string) {
        this.name = name

        if (quantity < 1) {
            console.log(`item ${name} was created with a quantity below 1`)
            this.quantity = 1
        }
        else {
            this.quantity = quantity
        }

        const rarities: string[] = [`Common`, `Rare`, `Epic`, `Legendary`]

        if (!rarities.includes(rarity)) {
            console.error(`Invalid rarity for item ${name}`)
        }

        this.rarity = rarity
    }
}

export class Inventory {
    items: item[] = []

    public addItem(itemToAdd: item): void {
        const existingItem = this.items.find((e) => e.name === itemToAdd.name);

        if (existingItem) {

            existingItem.quantity += itemToAdd.quantity;
        }
        else {

            this.items.push(itemToAdd);
        }
    }

    public removeItem(itemName: string, quantity: number): void {
        const item = this.items.find((e) => e.name === itemName)

        if (!item) {
            console.log(`Item "${itemName}" cannot be found`)
            return
        }

        item.quantity -= quantity


        if (item.quantity <= 0) {
            this.items = this.items.filter((e) => e.name !== itemName)
        }
    }

    public viewInventory(): string {
        let description = "Inventory: ";

        if (this.items.length <= 0) {
            description += `Empty`
            return description
        }

        this.items.forEach((item, index) => {
            description += `${item.quantity}x ${item.rarity} ${item.name}`;

            if (index < this.items.length - 1) {
                description += ", ";
            }
        });

        return description;
    }
}