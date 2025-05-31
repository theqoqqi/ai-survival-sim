import { Grid } from './util/Grid';
import Tile, { TileData } from './Tile';
import Entity from './Entity';

export class TileGrid {

    private readonly grid: Grid<Tile>;

    constructor(width: number, height: number, initializer: (x: number, y: number) => TileData) {
        this.grid = new Grid<Tile>(width, height, (x, y) => {
            return new Tile(x, y, initializer(x, y));
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
        this.getTile(x, y).data = data;
    }

    getTile(x: number, y: number): Tile {
        return this.grid.get(x, y);
    }

    setTile(x: number, y: number, tile: Tile): void {
        this.grid.set(x, y, tile);
    }

    addEntity(x: number, y: number, entity: Entity): void {
        const tile = this.getTile(x, y);

        tile.entities.push(entity);
    }

    removeEntity(x: number, y: number, entityId: string): boolean {
        const tile = this.getTile(x, y);
        const index = tile.entities.findIndex(e => e.id === entityId);

        if (index < 0) {
            return false;
        }

        tile.entities.splice(index, 1);

        return true;
    }

    getEntities(x: number, y: number): Entity[] {
        return [...this.getTile(x, y).entities];
    }

    map<U>(callback: (tile: Tile, x: number, y: number) => U): U[][] {
        return this.grid.map(callback);
    }

    toArray(): Tile[][] {
        return this.grid.toArray();
    }
}
