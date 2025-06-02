
export interface Vector {
    readonly x: number;
    readonly y: number;
}

export class Vectors {

    static equals(a: Vector, b: Vector): boolean {
        return a.x === b.x && a.y === b.y;
    }

    static add(a: Vector, b: Vector): Vector {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
        };
    }

    static subtract(a: Vector, b: Vector): Vector {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
        };
    }

    static toDirection(vector: Vector): Vector {
        const signX = vector.x > 0 ? 1 : vector.x < 0 ? -1 : 0;
        const signY = vector.y > 0 ? 1 : vector.y < 0 ? -1 : 0;

        return {
            x: signX,
            y: signY,
        };
    }
}
