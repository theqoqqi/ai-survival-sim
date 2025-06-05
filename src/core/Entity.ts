import type InventoryItem from './InventoryItem';
import Inventory from './Inventory';
import { CustomVars, CustomVarsData } from './util/CustomVars';

export type SerializedEntity = {
    id: string;
    icon: string;
    title: string;
    inventory: InventoryItem[];
    customVars?: CustomVarsData;
};

export default class Entity {

    readonly id: string;

    icon: string;

    title: string;

    inventory: Inventory;

    readonly customVars: CustomVars;

    constructor(params: SerializedEntity) {
        this.id = params.id;
        this.icon = params.icon;
        this.title = params.title;
        this.inventory = new Inventory(params.inventory);
        this.customVars = new CustomVars(params.customVars);
    }

    toJson(): SerializedEntity {
        return {
            id: this.id,
            icon: this.icon,
            title: this.title,
            inventory: this.inventory.getItems(),
            customVars: this.customVars.toJson(),
        };
    }
}
