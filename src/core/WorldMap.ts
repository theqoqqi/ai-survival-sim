import Tile, { TileData } from './Tile';
import { TileGrid } from './TileGrid';

type WorldMapOptions = InitialTilesWorldMapOptions | EmptyTileDataWorldMapOptions;

export interface InitialTilesWorldMapOptions {
    initialTiles: TileData[][];
}

export interface EmptyTileDataWorldMapOptions {
    width: number;
    height: number;
    emptyTileData: TileData;
}

export interface SerializedWorldMap {
    tiles: TileData[][];
}

export default class WorldMap {

    readonly grid: TileGrid;

    constructor(options: WorldMapOptions) {
        this.grid = this.createTilesFromOptions(options);
    }

    private createTilesFromOptions(options: WorldMapOptions) {
        if ('initialTiles' in options) {
            return TileGrid.fromArray(options.initialTiles);
        }

        if (options.width === undefined || options.height === undefined) {
            throw new Error('Width and height must be provided if no initialTiles');
        }

        return new TileGrid(options.width, options.height, () => options.emptyTileData);
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

    toJson(): SerializedWorldMap {
        return {
            tiles: this.grid.map(tile => tile.data)
        };
    }

    static fromJson(json: SerializedWorldMap): WorldMap {
        return new WorldMap({
            initialTiles: json.tiles
        });
    }
}
