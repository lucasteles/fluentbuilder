# FluentBuilder

FluentBuilder gives a simple way for creating data builder for your tests, with all beauty of an good intellisense.

It's recommended to use with TypeScript and a library like [Faker.Js](https://github.com/marak/Faker.js/) for fake data.

## Installation

Nothing new here, just npm install
```sh
npm i --save-dev fluentbuilder
```

## How To

lets define an interface (can be a class or anything like)

```ts
interface Foo {
    id: number,
    name: string
}
```

You can define a shape for your builder and use the `from` method, which receives a factory function, it will use your shape to generate your teste data 

```ts
  const builder = new Builder<Foo>()
  builder.from(() => ({ id: 1, name: 'bar' }))

  builder.generate() // { id: 1, name: 'bar' }
```

This example is not very exciting, but if we put some [Faker.Js](https://github.com/marak/Faker.js/) we can do better

```ts
import * as faker from 'faker'

const builder = new Builder<Foo>()
builder.from(() => ({ 
    id: faker.random.number(),
    name: faker.name.firstName()
}))

builder.generate() // { id: 37566, name: 'Marquis' }
builder.generate() // { id: 7487, name: 'Joy' }
builder.generate(2) // [ { id: 35751, name: 'Opal' }, { id: 94291, name: 'Savion' } ]
```

like that, every time we call `generate()` we will have a new data. note the fact which if we pass a number as an argument to generate method, it will return an array of your type

## Fluent Style

You can define your value `rules` in an individual way, for it we have two methods (which did the same thing in a different way)

JS style
```ts
builder.ruleFor("id", () => faker.random.number())
```

kind of `C#` style
```ts
builder.ruleFor(x => x.name, () => faker.random.alphaNumeric(10))
```

In both forms we have a good intellisense/autocomplete help




