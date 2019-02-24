import randomInt from "./random"
import deprecated from 'deprecated-decorator'


export default class Builder<T> {
    private rules: (() => any)[] = []

    @deprecated("addShape")
    from(shape: () => Partial<T>): this {
        return this.addShape(shape)
    }

    addShape(shape: () => Partial<T>): this {
        this.rules.push(shape)
        return this
    }

    ruleFor<K extends keyof T>(property: K, v:  T[K]): this 
    ruleFor<K extends keyof T>(property: K, v: () => T[K]): this 
    ruleFor<K extends keyof T>(property: K, v: T[K] | (() => T[K])): this {
        const value = v instanceof Function ? v() : v
        const factory = () => ({ [property]: value })
        this.addShape(<any>factory)
        return this
    }

    generate(qtd: number): T[] 
    generate(): T
    generate(qtd?: number): T | T[]
    {
        const generate = () =>
            this.rules.reduce((a, b) => ({ ...a, ...b() }), {})

        return (qtd) ?
                <T[]>Array.apply(0, Array(qtd)).map(() => generate())
                : <T>generate()
    }

    generateRandom(qtdMin: number, qtdMax?: number): T[] 
    {
        const rand = randomInt(qtdMin, qtdMax) 
        return this.generate(rand) 
    }

    @deprecated("use createBuilder standalone function instead")
    static create<T>(shape: () => Partial<T>): Builder<T> {
        return createBuilder(shape)
    }
}

export const createBuilder = <T>(shape: () => Partial<T>) => new Builder<T>().addShape(shape)

export function generate<T>(shape: () => Partial<T>, qtd: number): T[] 
export function generate<T>(shape: () => Partial<T>): T
export function generate<T>(shape: () => Partial<T>, qtd?: number): T | T[]
{
    return createBuilder<T>(shape).generate(<any>qtd)
}

export function generateRandom<T>(shape: () => Partial<T>, qtdMin: number, qtdMax?: number): T[]
{
    return createBuilder<T>(shape).generateRandom(qtdMin, qtdMax)
}
