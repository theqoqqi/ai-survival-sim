import WorldMap from '../WorldMap';

export type SerializedAction = {
    type: string,
};

export default abstract class Action<T extends SerializedAction> {

    abstract readonly type: string;

    abstract apply(world: WorldMap): void

    abstract toJson(): T

    static fromJson(json: any): Action<any> {
        throw new Error('Not implemented');
    }
}
