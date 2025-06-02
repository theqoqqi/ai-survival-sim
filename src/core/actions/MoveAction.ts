import Action from './Action';
import type WorldMap from '../WorldMap';
import type { Vector } from '../util/Vector';
import { Vectors } from '../util/Vector';

export type SerializedMoveAction = {
    type: 'move';
    entityId: string;
    moveBy: Vector;
}

export default class MoveAction extends Action<SerializedMoveAction> {

    readonly type = 'move' as const;

    readonly entityId: string;

    readonly moveBy: Vector;

    constructor(entityId: string, moveBy: Vector, limitToSingleTile: boolean = true) {
        super();
        this.entityId = entityId;
        this.moveBy = limitToSingleTile
            ? Vectors.toDirection(moveBy)
            : moveBy;
    }

    apply(world: WorldMap): void {
        const entityTile = world.findEntityTile(this.entityId);

        if (!entityTile) {
            return;
        }

        const { x: newX, y: newY } = Vectors.add(entityTile.position, this.moveBy);

        world.moveEntity(this.entityId, newX, newY);
    }

    toJson(): SerializedMoveAction {
        return {
            type: this.type,
            entityId: this.entityId,
            moveBy: this.moveBy
        };
    }

    static fromJson(json: any): MoveAction {
        return new MoveAction(json.entityId, json.moveBy);
    }
}
