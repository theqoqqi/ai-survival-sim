
export interface CustomVar {
    icon: string;
    title: string;
    value: string;
}

export type CustomVarsData = Record<string, CustomVar>;

export class CustomVars {

    private readonly vars: CustomVarsData;

    constructor(initial?: CustomVarsData) {
        this.vars = initial ? { ...initial } : {};
    }

    get size(): number {
        return Object.keys(this.vars).length;
    }

    addVar(id: string, varItem: CustomVar): void {
        this.vars[id] = { ...varItem };
    }

    removeVar(id: string): void {
        delete this.vars[id];
    }

    setVarValue(id: string, newValue: string): void {
        const existing = this.vars[id];

        if (!existing) {
            return;
        }

        existing.value = newValue;
    }

    getAll(): CustomVarsData {
        return { ...this.vars };
    }

    map<U>(fn: (id: string, customVar: CustomVar) => U): U[] {
        return Object.entries(this.vars).map(([id, customVar]) => fn(id, customVar));
    }

    toJson(): CustomVarsData {
        return this.getAll();
    }
}
