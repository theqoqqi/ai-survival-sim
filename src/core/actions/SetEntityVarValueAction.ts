import Action from './Action';
import WorldMap from '../WorldMap';
import Entity from '../Entity';

export type SerializedSetEntityVarValueAction = {
    type: 'setEntityVarValue';
    entityId: string;
    customVarId: string;
    newValue: string;
};

export class SetEntityVarValueAction extends Action<SerializedSetEntityVarValueAction> {

    readonly type = 'setEntityVarValue' as const;

    readonly entityId: string;

    readonly customVarId: string;

    readonly newValue: string;

    constructor(entityId: string, customVarId: string, newValue: string) {
        super();
        this.entityId = entityId;
        this.customVarId = customVarId;
        this.newValue = newValue;
    }

    apply(world: WorldMap): void {
        const entity: Entity | null = world.getEntity(this.entityId);

        if (!entity) {
            return;
        }

        entity.customVars.setVarValue(this.customVarId, this.newValue);
    }

    toJson(): SerializedSetEntityVarValueAction {
        return {
            type: this.type,
            entityId: this.entityId,
            customVarId: this.customVarId,
            newValue: this.newValue,
        };
    }

    static fromJson(json: any): SetEntityVarValueAction {
        return new SetEntityVarValueAction(json.entityId, json.customVarId, json.newValue);
    }
}
