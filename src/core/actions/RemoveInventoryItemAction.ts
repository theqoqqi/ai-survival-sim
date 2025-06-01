import Action from './Action';
import type WorldMap from '../WorldMap';

export type SerializedRemoveInventoryItemAction = {
    type: 'removeItem'
    entityId: string
    itemId: string
    amount?: number
}

export class RemoveInventoryItemAction extends Action<SerializedRemoveInventoryItemAction> {

    readonly type = 'removeItem' as const;

    readonly entityId: string;

    readonly itemId: string;

    readonly amount?: number;

    constructor(entityId: string, itemId: string, amount?: number) {
        super();
        this.entityId = entityId;
        this.itemId = itemId;
        this.amount = amount;
    }

    apply(world: WorldMap): void {
        const entity = world.findEntity(this.entityId);

        if (!entity) {
            return;
        }

        entity.inventory.removeItem(this.itemId, this.amount);
    }

    toJson(): SerializedRemoveInventoryItemAction {
        return {
            type: this.type,
            entityId: this.entityId,
            itemId: this.itemId,
            amount: this.amount,
        };
    }

    static fromJson(json: any): RemoveInventoryItemAction {
        return new RemoveInventoryItemAction(json.entityId, json.itemId, json.amount);
    }
}
