import Action from './Action';
import WorldMap from '../WorldMap';
import Entity from '../Entity';

export type SerializedRemoveEntityVarAction = {
    type: 'removeEntityVar';
    entityId: string;
    customVarId: string;
};

export class RemoveEntityVarAction extends Action<SerializedRemoveEntityVarAction> {
    readonly type = 'removeEntityVar' as const;


    readonly entityId: string;

    readonly customVarId: string;

    constructor(entityId: string, customVarId: string) {
        super();
        this.entityId = entityId;
        this.customVarId = customVarId;
    }

    apply(world: WorldMap): void {
        const entity: Entity | null = world.getEntity(this.entityId);

        if (!entity) {
            return;
        }

        entity.customVars.removeVar(this.customVarId);
    }

    toJson(): SerializedRemoveEntityVarAction {
        return {
            type: this.type,
            entityId: this.entityId,
            customVarId: this.customVarId,
        };
    }

    static fromJson(json: any): RemoveEntityVarAction {
        return new RemoveEntityVarAction(json.entityId, json.customVarId);
    }
}
