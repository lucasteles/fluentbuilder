
export default class Builder<T> {

    private rules: (() => any)[] = []

    from(gen: () => Partial<T>): this {
        this.rules.push(gen)
        return this
    }

    private ruleForFunc<V>(property: (p: T) => V, v: () => V): this {
        let pName = ''
        const handler = {
            get: (_, name) => { pName = name }
        }
        const proxy = new Proxy({}, handler)
        property(proxy)

        const factory = () => ({ [pName]: v() })
        this.from(<any>factory)
        return this
    }

    private ruleForStr<K extends keyof T>(property: K, v: () => T[K]): this {
        const factory = () => ({ [property]: v() })
        this.from(<any>factory)
        return this
    }


    ruleFor<V>(property: (p: T) => V, v: () => V): this
    ruleFor<K extends keyof T>(property: K, v: () => T[K]): this
    ruleFor(property, v): this 
    {
        return typeof(property) == "function" 
          ? this.ruleForFunc(property,v)
          : this.ruleForStr(property, v)
    }

    generate(qtd?: number): T | T[] {
        const generate = () =>
            this.rules.reduce((a, b) => ({ ...a, ...b() }), {})

        if (qtd) {
            return <T[]>Array(qtd)
                .fill(undefined)
                .map(() => generate())
        } else {
            return <T>generate()
        }
    }
}