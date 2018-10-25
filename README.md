# FluentBuilder

FluentBuilder provides a simple way for creating data builders for your tests, with all the beauty of a good intellisense.

It's recommended to use with TypeScript and a library like [Faker.Js](https://github.com/marak/Faker.js/) for fake data.

## Installation

Nothing new here, just npm install
```sh
npm i --save-dev fluentbuilder
```

## How To

Let's define an interface (can be a class or anything like that)

```ts
interface Foo {
    id: number,
    name: string
}
```

Then define a shape for your builder and use the `from` method, which receives a factory function. It will use your shape to generate your test data

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

Like that, every time we call `generate()` we will have new data. Note the fact that if we pass a number as an argument to the `generate()` method, it will return an array of your type of the specified size

## Fluent Style

You can define `rules` for each of the properties in your type. For this we have two methods (which do the same thing in different ways)

JS style
```ts
builder.ruleFor("id", () => faker.random.number())
```

kind of `C#` style
```ts
builder.ruleFor(x => x.name, () => faker.random.alphaNumeric(10))
```

In both forms we have great intellisense/autocomplete

JS Style
![](https://raw.githubusercontent.com/lucasteles/fluentbuilder/master/img/strcomplete.gif)


C# Style
![](https://raw.githubusercontent.com/lucasteles/fluentbuilder/master/img/funccomplete.gif)


With these methods it's easy to derive a class from Builder<T> and make a domain specific builder

```ts
import Builder from 'fluentbuilder'
import * as faker from 'faker'

class FooBuilder extends Builder<Foo> {
    constructor(){
        super()

        // define basic props
        this.from(() => ({
            id: faker.random.number(),
            name: faker.name.firstName()
        }))
    }

    withName(name: string): this {
        this.ruleFor("name", () => name);
        return this
    }
}

const fooBuilder = new FooBuilder()

fooBuilder.generate() // { id: 58431, name: 'Lesley' }
fooBuilder.withName("Fluffy").generate() // { id: 25927, name: 'Fluffy' }

```

The methods can be chained, so this is a valid approach

```ts

const fooFactory = () =>
    new Builder<Foo>()
    .ruleFor("id", () => faker.random.number())
    .ruleFor("name", () => faker.name.firstName())
    .generate()

```
