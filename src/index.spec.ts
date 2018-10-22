import Builder from './index'

interface Foo {
    id: number,
    name: string
}

let builder: Builder<Foo>

beforeEach(() => {
  builder = new Builder<Foo>()  
})

test('should create', () => {
  expect(builder).toBeTruthy() 
})

test('should build from shape', () => {
  const shape: Partial<Foo>  = {
    id: 1
  }
  const value = builder.from(() => shape).generate()

  expect(value).toStrictEqual(shape)
})

test('should build from  complex shape', () => {
  const shape: Partial<Foo>  = {
    id: 1,
    name: "name"
  }
  const value = builder.from(() => shape).generate()
  expect(value).toStrictEqual(shape)
})

test('should define a value from a string property rule', () => {
  const value = builder.ruleFor("id", () => 1).generate()

  expect(value).toStrictEqual({ id: 1})
})

test('should define a value from a func property rule', () => {
  const value = builder.ruleFor(x => x.name, () => "bar").generate()

  expect(value).toStrictEqual({ name: "bar"})
})

test('should generate multiple instances of a shape ', () => {
  const shape: Partial<Foo>  = {
    id: 1,
    name: "name"
  }
  const value = builder.from(() => shape).generate(2)
  expect(value).toStrictEqual([shape, shape])
})
