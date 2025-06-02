import Action from './Action';
import type WorldMap from '../WorldMap';
import type { Vector } from '../util/Vector';

export type SerializedJumpAction = {
    type: 'jump';
    entityId: string;
    target: Vector;
}

export default class JumpAction extends Action<SerializedJumpAction> {

    readonly type = 'jump' as const;

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

    toJson(): SerializedJumpAction {
        return {
            type: this.type,
            entityId: this.entityId,
            target: this.target
        };
    }

    static fromJson(json: any): JumpAction {
        return new JumpAction(json.entityId, json.target);
    }
}
