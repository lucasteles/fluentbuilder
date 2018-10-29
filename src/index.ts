
export default class Builder<T> {

    private rules: (() => any)[] = []

    from(gen: () => Partial<T>): this {
        this.rules.push(gen)
        return this
    }

    ruleFor<K extends keyof T>(property: K, v: () => T[K]): this {
        const factory = () => ({ [property]: v() })
        this.from(<any>factory)
        return this
    }

    generate(qtd: number): T[] 
    generate(): T
    generate(qtd?: number): T | T[]
    {
        const generate = () =>
            this.rules.reduce((a, b) => ({ ...a, ...b() }), {})

        if (qtd) {
            return <T[]>Array.apply(0, Array(qtd)).map(() => generate())
        } else {
            return <T>generate()
        }
    }

    static create<T>(gen: () => Partial<T>): Builder<T> {
        return new Builder<T>().from(gen)
    }
}