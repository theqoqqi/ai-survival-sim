import Entity, { SerializedEntity } from '../Entity';
import Action from './Action';
import WorldMap from '../WorldMap';

export type SerializedAddEntityAction = {
    type: 'addEntity';
    entity: SerializedEntity;
    x: number;
    y: number;
};

export class AddEntityAction extends Action<SerializedAddEntityAction> {

    readonly type = 'addEntity' as const;

    readonly entity: SerializedEntity;

    readonly x: number;

    readonly y: number;

    constructor(entity: SerializedEntity, x: number, y: number) {
        super();
        this.entity = entity;
        this.x = x;
        this.y = y;
    }

    apply(world: WorldMap): void {
        world.addEntity(this.x, this.y, new Entity(this.entity));
    }

    toJson(): SerializedAddEntityAction {
        return {
            type: this.type,
            entity: this.entity,
            x: this.x,
            y: this.y,
        };
    }

    static fromJson(json: SerializedAddEntityAction): AddEntityAction {
        return new AddEntityAction(json.entity, json.x, json.y);
    }
}
