import { Grid } from './util/Grid';
import Tile, { TileData } from './Tile';

export class TileGrid {

    private readonly grid: Grid<Tile>;

    constructor(width: number, height: number, initializer: (x: number, y: number) => TileData) {
        this.grid = new Grid<Tile>(width, height, (x, y) => {
            return TileGrid.createTile(x, y, initializer(x, y));
        });
    }

    get width(): number {
        return this.grid.width;
    }

    get height(): number {
        return this.grid.height;
    }

    getData(x: number, y: number): TileData {
        return this.getTile(x, y).data;
    }

    setData(x: number, y: number, data: TileData): void {
        this.setTile(x, y, TileGrid.createTile(x, y, data));
    }

    getTile(x: number, y: number): Tile {
        return this.grid.get(x, y);
    }

    setTile(x: number, y: number, tile: Tile): void {
        this.grid.set(x, y, tile);
    }

    map<U>(callback: (tile: Tile, x: number, y: number) => U): U[][] {
        return this.grid.map(callback);
    }

    toArray(): Tile[][] {
        return this.grid.toArray();
    }

    private static createTile(x: number, y: number, data: TileData): Tile {
        return {
            position: { x, y },
            data
        };
    }

    static fromArray(data: TileData[][]): TileGrid {
        return new TileGrid(data[0].length, data.length, (x, y) => data[y][x]);
    }
}
