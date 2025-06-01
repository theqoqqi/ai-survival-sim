import { Position } from './util/Position';
import Entity, { SerializedEntity } from './Entity';

export interface TileFeature {
    icon: string;
    title: string;
    description: string;
}

export interface TileTerrain {
    color: string;
    title: string;
}

export interface TileData {
    feature: TileFeature | null;
    terrain: TileTerrain;
}

export interface SerializedTile {
    position: Position;
    data: TileData;
    entities: SerializedEntity[];
}

export default class Tile {

    readonly position: Position;

    data: TileData;

    readonly entities: Entity[];

    constructor(x: number, y: number, data: TileData, entities: Entity[] = []) {
        this.position = { x, y };
        this.data = data;
        this.entities = entities;
    }

    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    removeEntity(entity: Entity): boolean {
        const index = this.entities.indexOf(entity);

        if (index < 0) {
            return false;
        }

        this.entities.splice(index, 1);

        return true;
    }

    hasEntity(entityId: string): boolean {
        return this.entities.some(entity => entity.id === entityId);
    }

    getEntity(entityId: string): Entity | null {
        return this.entities.find(entity => entity.id === entityId) || null;
    }

    toJson(): SerializedTile {
        return {
            position: this.position,
            data: this.data,
            entities: this.entities.map(entity => entity.toJson()),
        };
    }

    static fromJson(tile: SerializedTile): Tile {
        return new Tile(
            tile.position.x,
            tile.position.y,
            tile.data,
            tile.entities.map(entity => Entity.fromJson(entity))
        );
    }
}
