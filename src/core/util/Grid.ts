
export class Grid<T> {

    readonly width: number;

    readonly height: number;

    private readonly data: T[][];

    constructor(width: number, height: number, initializer: (x: number, y: number) => T) {
        this.width = width;
        this.height = height;
        this.data = Array.from({ length: height }, (_, y) =>
            Array.from({ length: width }, (_, x) => initializer(x, y))
        );
    }

    isInBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    get(x: number, y: number): T {
        this.checkBounds(x, y);
        return this.data[y][x];
    }

    set(x: number, y: number, value: T): void {
        this.checkBounds(x, y);
        this.data[y][x] = value;
    }

    map<U>(fn: (value: T, x: number, y: number) => U): U[][] {
        return this.data.map((row, y) =>
            row.map((value, x) => fn(value, x, y))
        );
    }

    private checkBounds(x: number, y: number): void {
        if (!this.isInBounds(x, y)) {
            throw new Error(`Out of bounds: (${x}, ${y})`);
        }
    }

    toArray(): T[][] {
        return this.data;
    }

    static fromArray<T>(data: T[][]): Grid<T> {
        const width = data[0]?.length ?? 0;
        const height = data.length;

        return new Grid(width, height, (x, y) => data[y][x]);
    }
}
