import random from './random'

it('should generate random numbers from 0 to 10', () => {
  for (let x = 0; x < 100; x++) {
    const value = random(10)
    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThanOrEqual(10)
  }
})

it('should generate random numbers from 100 to 1000', () => {
  for (let x = 0; x < 100; x++) {
    const value = random(100, 1000)
    expect(value).toBeGreaterThanOrEqual(100)
    expect(value).toBeLessThanOrEqual(1000)
  }
})