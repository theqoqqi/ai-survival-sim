import Action from './Action';
import { CustomVar } from '../util/CustomVars';
import WorldMap from '../WorldMap';
import Entity from '../Entity';

export type SerializedAddEntityVarAction = {
    type: 'addEntityVar';
    entityId: string;
    customVarId: string;
    customVar: CustomVar;
};

export class AddEntityVarAction extends Action<SerializedAddEntityVarAction> {

    readonly type = 'addEntityVar' as const;

    readonly entityId: string;

    readonly customVarId: string;

    readonly customVar: CustomVar;

    constructor(entityId: string, customVarId: string, customVar: CustomVar) {
        super();
        this.entityId = entityId;
        this.customVarId = customVarId;
        this.customVar = { ...customVar };
    }

    apply(world: WorldMap): void {
        const entity: Entity | null = world.getEntity(this.entityId);

        if (!entity) {
            return;
        }

        entity.customVars.addVar(this.customVarId, this.customVar);
    }

    toJson(): SerializedAddEntityVarAction {
        return {
            type: this.type,
            entityId: this.entityId,
            customVarId: this.customVarId,
            customVar: this.customVar,
        };
    }

    static fromJson(json: any): AddEntityVarAction {
        return new AddEntityVarAction(json.entityId, json.customVarId, json.customVar);
    }
}
