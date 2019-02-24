export default class Builder<T> {
    private rules;
    from(shape: () => Partial<T>): this;
    addShape(shape: () => Partial<T>): this;
    ruleFor<K extends keyof T>(property: K, v: T[K]): this;
    ruleFor<K extends keyof T>(property: K, v: () => T[K]): this;
    generate(qtd: number): T[];
    generate(): T;
    generateRandom(qtdMin: number, qtdMax?: number): T[];
    static create<T>(shape: () => Partial<T>): Builder<T>;
}
export declare const createBuilder: <T>(shape: () => Partial<T>) => Builder<T>;
export declare function generate<T>(shape: () => Partial<T>, qtd: number): T[];
export declare function generate<T>(shape: () => Partial<T>): T;
export declare function generateRandom<T>(shape: () => Partial<T>, qtdMin: number, qtdMax?: number): T[];
