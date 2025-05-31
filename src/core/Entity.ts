import type InventoryItem from './InventoryItem';
import Inventory from './Inventory';

export type SerializedEntity = {
    id: string;
    icon: string;
    title: string;
    inventory: InventoryItem[];
};

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

    toJson(): SerializedEntity {
        return {
            id: this.id,
            icon: this.icon,
            title: this.title,
            inventory: this.inventory.getItems(),
        };
    }

    static fromJson(json: SerializedEntity): Entity {
        return new Entity({
            id: json.id,
            icon: json.icon,
            title: json.title,
            initialItems: json.inventory,
        });
    }
}
