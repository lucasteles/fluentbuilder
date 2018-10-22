export default class Builder<T> {
    private rules;
    constructor();
    from(gen: () => Partial<T>): this;
    private ruleForFunc<V>(property, v);
    private ruleForStr<K>(property, v);
    ruleFor<V>(property: (p: T) => V, v: () => V): this;
    ruleFor<K extends keyof T>(property: K, v: () => T[K]): this;
    generate(qtd?: number): T | T[];
}
