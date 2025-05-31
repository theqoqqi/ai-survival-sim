import { Position } from './util/Position';
import Entity from './Entity';

export interface TileContent {
    icon: string;
    title: string;
    description: string;
}

export interface TileTerrain {
    color: string;
    title: string;
}

export interface TileData {
    content: TileContent | null;
    terrain: TileTerrain;
}

export default interface Tile {
    readonly position: Position;
    readonly data: TileData;
    readonly entities: Entity[],
}
