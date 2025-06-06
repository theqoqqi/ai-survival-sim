import { Vector } from '../util/Vector';
import { TileFeature } from '../Tile';
import Action from './Action';
import WorldMap from '../WorldMap';

export type SerializedSetTileFeatureAction = {
    type: 'setTileFeature';
    position: Vector;
    feature?: TileFeature;
};

export class SetTileFeatureAction extends Action<SerializedSetTileFeatureAction> {

    readonly type = 'setTileFeature' as const;

    readonly position: Vector;

    readonly feature?: TileFeature;

    constructor(position: Vector, feature?: TileFeature) {
        super();
        this.position = position;
        this.feature = feature;
    }

    apply(world: WorldMap): void {
        const tile = world.getTile(this.position.x, this.position.y);

        if (!tile) {
            return;
        }

        tile.data.feature = this.feature ? { ...this.feature } : null;
    }

    toJson(): SerializedSetTileFeatureAction {
        return {
            type: this.type,
            position: this.position,
            feature: this.feature,
        };
    }

    static fromJson(json: any): SetTileFeatureAction {
        return new SetTileFeatureAction(json.position, json.feature);
    }
}
