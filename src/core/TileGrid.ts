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

    moveEntity(entity: Entity | string, x: number, y: number): void {
        if (!this.grid.isInBounds(x, y)) {
            return;
        }

        const foundEntity = this.getEntity(entity);

        if (!foundEntity) {
            return;
        }

        this.removeEntity(foundEntity);
        this.addEntity(x, y, foundEntity);
    }

    addEntity(x: number, y: number, entity: Entity): void {
        this.getTile(x, y).addEntity(entity);
    }

    removeEntity(entity: Entity | string): boolean {
        const foundEntity = this.getEntity(entity);

        if (!foundEntity) {
            return false;
        }

        const tile = this.findEntityTile(foundEntity);

        return tile?.removeEntity(foundEntity) ?? false;
    }

    getEntity(entity: Entity | string): Entity | null {
        if (typeof entity === 'string') {
            return this.findEntity(entity);
        }

        return entity;
    }

    findEntity(entityId: string): Entity | null {
        return this.findEntityTile(entityId)?.getEntity(entityId) ?? null;
    }

    findEntityTile(entity: Entity | string): Tile | null {
        const entityId = typeof entity === 'string' ? entity : entity.id;

        for (const tile of this.toArray().flat()) {
            if (tile.hasEntity(entityId)) {
                return tile;
            }
        }

        return null;
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
