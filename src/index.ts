import randomInt from "./random"
import  * as faker from "faker"

type Faker = Faker.FakerStatic

export default class Builder<T> {
    private rules: ((dataFactory : Faker) => any)[] = []

    addShape(shape: (dataFactory : Faker) => Partial<T>): this
    {
        this.rules.push(shape)
        return this
    }

    ruleFor<K extends keyof T>(property: K, v:  T[K]): this 
    ruleFor<K extends keyof T>(property: K, v: (dataFactory : Faker) => T[K]): this 
    ruleFor<K extends keyof T>(property: K, v: T[K] | ((dataFactory : Faker) => T[K])): this {
        const value = v instanceof Function ? v(faker) : v
        const factory = () => ({ [property]: value })
        this.addShape(<any>factory)
        return this
    }

    generate(qtd: number): T[] 
    generate(): T
    generate(qtd?: number): T | T[]
    {
        const generate = () =>
            this.rules.reduce((a, b) => ({ ...a, ...b(faker) }), {})

        return (qtd) ?
                <T[]>Array.apply(0, Array(qtd)).map(() => generate())
                : <T>generate()
    }

    generateRandom(qtdMin: number, qtdMax?: number): T[] 
    {
        const rand = randomInt(qtdMin, qtdMax) 
        return this.generate(rand === 0 ? 1 : rand) 
    }

}

export function createBuilder<T>(shape: (dataFactory : Faker) => Partial<T>) : Builder<T>
{
    return new Builder<T>().addShape(shape)
}

export function generate<T>(shape: (dataFactory : Faker) => Partial<T>, qtd: number): T[] 
export function generate<T>(shape: (dataFactory : Faker) => Partial<T>): T
export function generate<T>(shape: (dataFactory : Faker) => Partial<T>, qtd?: number): T | T[]
export function generate<T>(shape: ((dataFactory : Faker)=> Partial<T>) | (() => Partial<T>), qtd?: number): T | T[]
{
    return createBuilder<T>(shape).generate(<any>qtd)
}

export function setLocale(locale: string) : void {
    (<any>faker).locale = locale
}

export function generateRandom<T>(shape: (dataFactory : Faker) => Partial<T>, qtdMin: number, qtdMax?: number): T[]
{
    return createBuilder<T>(<any>shape).generateRandom(qtdMin, qtdMax)
}
