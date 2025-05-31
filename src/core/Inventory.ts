import type InventoryItem from './InventoryItem';

export default class Inventory {

    private readonly items: InventoryItem[];

    constructor(initialItems?: InventoryItem[]) {
        this.items = initialItems ? [...initialItems] : [];
    }

    getItems(): InventoryItem[] {
        return [...this.items];
    }

    addItem(item: InventoryItem): void {
        const existing = this.items.find((i) => i.id === item.id);

        if (existing) {
            existing.amount += item.amount;
        } else {
            this.items.push({ ...item });
        }
    }

    removeItem(itemId: string, amount: number): boolean {
        const index = this.items.findIndex((i) => i.id === itemId);

        if (index === -1 || this.items[index].amount < amount) {
            return false;
        }

        this.items[index].amount -= amount;

        if (this.items[index].amount <= 0) {
            this.items.splice(index, 1);
        }

        return true;
    }

    hasItem(itemId: string, count: number = 1): boolean {
        const existing = this.items.find((i) => i.id === itemId);

        return Boolean(existing && existing.amount >= count);
    }
}
