/// <reference types="faker" />
export declare type Faker = Faker.FakerStatic;
export default class Builder<T> {
    private rules;
    addShape(shape: (dataFactory: Faker) => Partial<T>): this;
    ruleFor<K extends keyof T>(property: K, v: T[K]): this;
    ruleFor<K extends keyof T>(property: K, v: (dataFactory: Faker) => T[K]): this;
    generate(qtd: number): T[];
    generate(): T;
    generateRandom(qtdMin: number, qtdMax?: number): T[];
}
export declare function createBuilder<T>(shape: (dataFactory: Faker) => Partial<T>): Builder<T>;
export declare function generate<T>(shape: (dataFactory: Faker) => Partial<T>, qtd: number): T[];
export declare function generate<T>(shape: (dataFactory: Faker) => Partial<T>): T;
export declare function generate<T>(shape: (dataFactory: Faker) => Partial<T>, qtd?: number): T | T[];
export declare function setLocale(locale: string): void;
export declare function generateRandom<T>(shape: (dataFactory: Faker) => Partial<T>, qtdMin: number, qtdMax?: number): T[];
