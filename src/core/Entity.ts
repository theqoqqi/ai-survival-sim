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

    constructor(params: SerializedEntity) {
        this.id = params.id;
        this.icon = params.icon;
        this.title = params.title;
        this.inventory = new Inventory(params.inventory);
    }

    toJson(): SerializedEntity {
        return {
            id: this.id,
            icon: this.icon,
            title: this.title,
            inventory: this.inventory.getItems(),
        };
    }
}
