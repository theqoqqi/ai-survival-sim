import Action from './Action';
import WorldMap from '../WorldMap';

export type SerializedAddItemToStackAction = {
    type: 'addItemToStack';
    entityId: string;
    itemId: string;
    amount: number;
};

export class AddItemToStackAction extends Action<SerializedAddItemToStackAction> {

    readonly type = 'addItemToStack' as const;

    readonly entityId: string;

    readonly itemId: string;

    readonly amount: number;

    constructor(entityId: string, itemId: string, amount: number) {
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

        entity.inventory.addItem(this.itemId, this.amount);
    }

    toJson(): SerializedAddItemToStackAction {
        return {
            type: this.type,
            entityId: this.entityId,
            itemId: this.itemId,
            amount: this.amount,
        };
    }

    static fromJson(json: any): AddItemToStackAction {
        return new AddItemToStackAction(json.entityId, json.itemId, json.amount);
    }
}
