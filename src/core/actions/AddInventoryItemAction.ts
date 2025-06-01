import InventoryItem from '../InventoryItem';
import Action from './Action';
import WorldMap from '../WorldMap';

export type SerializedAddInventoryItemAction = {
    type: 'addItem'
    entityId: string
    item: InventoryItem
}

export class AddInventoryItemAction extends Action<SerializedAddInventoryItemAction> {

    readonly type = 'addItem' as const;

    readonly entityId: string;

    readonly item: InventoryItem;

    constructor(entityId: string, item: InventoryItem) {
        super();
        this.entityId = entityId;
        this.item = item;
    }

    apply(world: WorldMap): void {
        const entity = world.findEntity(this.entityId);

        if (!entity) {
            return;
        }

        entity.inventory.addItem(this.item);
    }

    toJson(): SerializedAddInventoryItemAction {
        return {
            type: this.type,
            entityId: this.entityId,
            item: this.item
        };
    }

    static fromJson(json: any): AddInventoryItemAction {
        return new AddInventoryItemAction(json.entityId, json.item);
    }
}
