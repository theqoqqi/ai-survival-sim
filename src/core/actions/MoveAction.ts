import Action from './Action';
import type WorldMap from '../WorldMap';
import type { Vector } from '../util/Vector';

export type SerializedMoveAction = {
    type: 'move';
    entityId: string;
    target: Vector;
}

export default class MoveAction extends Action<SerializedMoveAction> {

    readonly type = 'move' as const;

    readonly entityId: string;

    readonly target: Vector;

    constructor(entityId: string, target: Vector) {
        super();
        this.entityId = entityId;
        this.target = target;
    }

    apply(world: WorldMap): void {
        world.moveEntity(this.entityId, this.target.x, this.target.y);
    }

    toJson(): SerializedMoveAction {
        return {
            type: this.type,
            entityId: this.entityId,
            target: this.target
        };
    }

    static fromJson(json: any): MoveAction {
        return new MoveAction(json.entityId, json.target);
    }
}
