import Action from './Action';
import WorldMap from '../WorldMap';

export type SerializedRemoveEntityAction = {
    type: 'removeEntity';
    entityId: string;
};

export class RemoveEntityAction extends Action<SerializedRemoveEntityAction> {

    readonly type = 'removeEntity' as const;

    readonly entityId: string;

    constructor(entityId: string) {
        super();
        this.entityId = entityId;
    }

    apply(world: WorldMap): void {
        world.removeEntity(this.entityId);
    }

    toJson(): SerializedRemoveEntityAction {
        return {
            type: this.type,
            entityId: this.entityId
        };
    }

    static fromJson(json: any): RemoveEntityAction {
        return new RemoveEntityAction(json.entityId);
    }
}
