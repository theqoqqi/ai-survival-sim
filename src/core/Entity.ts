import type InventoryItem from './InventoryItem';
import Inventory from './Inventory';

export default class Entity {

    readonly id: string;

    icon: string;

    title: string;

    inventory: Inventory;

    constructor(params: { id: string; icon: string; title: string; initialItems?: InventoryItem[] }) {
        this.id = params.id;
        this.icon = params.icon;
        this.title = params.title;
        this.inventory = new Inventory(params.initialItems);
    }
}
