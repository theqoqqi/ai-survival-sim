import Tile, { SerializedTile, TileData } from './Tile';
import { TileGrid } from './TileGrid';
import Entity from './Entity';

type WorldMapOptions = SerializedWorldMap | CreateWorldMapOptions;

export interface CreateWorldMapOptions {
    width: number;
    height: number;
    emptyTileData: TileData;
}

export interface SerializedWorldMap {
    width: number;
    height: number;
    emptyTileData: TileData;
    tiles: SerializedTile[];
}

export default class WorldMap {

    readonly grid: TileGrid;

    readonly emptyTileData: TileData;

    constructor(options: WorldMapOptions) {
        this.grid = new TileGrid(options.width, options.height, () => ({ ...options.emptyTileData }));
        this.emptyTileData = options.emptyTileData;
    }

    get width(): number {
        return this.grid.width;
    }

    get height(): number {
        return this.grid.height;
    }

    getTile(x: number, y: number): Tile {
        return this.grid.getTile(x, y);
    }

    setTileData(x: number, y: number, data: TileData): void {
        this.grid.setData(x, y, data);
    }

    moveEntity(entityId: string, x: number, y: number) {
        this.grid.moveEntity(entityId, x, y);
    }

    addEntity(x: number, y: number, entity: Entity): void {
        this.grid.addEntity(x, y, entity);
    }

    removeEntity(entityId: string): boolean {
        return this.grid.removeEntity(entityId);
    }

    getEntities(x: number, y: number): Entity[] {
        return this.grid.getEntities(x, y);
    }

    getEntity(entityId: string): Entity | null {
        return this.grid.getEntity(entityId);
    }

    findEntity(entityId: string): Entity | null {
        return this.grid.findEntity(entityId);
    }

    findEntityTile(entityId: string): Tile | null {
        return this.grid.findEntityTile(entityId);
    }

    toJson(): SerializedWorldMap {
        return {
            width: this.grid.width,
            height: this.grid.height,
            tiles: this.serializeTiles(),
            emptyTileData: this.emptyTileData,
        };
    }

    private serializeTiles() {
        return this.grid.toArray()
            .flat()
            .filter(tile => tile.data !== this.emptyTileData || tile.entities.length > 0)
            .map(tile => tile.toJson());
    }

    static fromJson(json: SerializedWorldMap): WorldMap {
        const map = new WorldMap(json);

        json.tiles.map(tile => Tile.fromJson(tile)).forEach(tile => {
            map.grid.setTile(tile.position.x, tile.position.y, tile);
        })

        return map;
    }
}
