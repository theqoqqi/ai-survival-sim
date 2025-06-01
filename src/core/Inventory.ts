import type InventoryItem from './InventoryItem';

export default class Inventory {

    private readonly items: InventoryItem[];

    constructor(initialItems?: InventoryItem[]) {
        this.items = initialItems ? [...initialItems] : [];
    }

    getItems(): InventoryItem[] {
        return [...this.items];
    }

    addItem(item: InventoryItem | string, amount: number = 1): boolean {
        if (typeof item === 'string') {
            return this.modifyStackSize(item, amount);
        }

        if (this.hasItem(item.id)) {
            return this.modifyStackSize(item.id, item.amount);
        }

        this.items.push({ ...item });
        return true;
    }

    removeItem(itemId: string, amount: number = Infinity): boolean {
        return this.modifyStackSize(itemId, -amount);
    }

    hasItem(itemId: string, count: number = 1): boolean {
        return this.getItemAmount(itemId) >= count;
    }

    getItemAmount(itemId: string): number {
        return this.findItem(itemId)?.amount ?? 0;
    }

    findItem(itemId: string): InventoryItem | null {
        return this.items.find((i) => i.id === itemId) ?? null;
    }

    private modifyStackSize(itemId: string, amount: number): boolean {
        const foundItem = this.items.find((i) => i.id === itemId);

        if (!foundItem) {
            return false;
        }

        foundItem.amount += amount;

        if (foundItem.amount <= 0) {
            this.items.splice(this.items.indexOf(foundItem), 1);
        }

        return true;
    }
}
