import { handler as placeOrderHandler } from './order'

describe('placeOrderHandler', () => {

  it('can place order', () => {
    const response = await placeOrderHandler({
      body: { orderId: '123' },
    })
    expect(response.statusCode).toBe(200)
  })

  it('returns 404 if order not found', () => {
    const response = await placeOrderHandler({
      body: { orderId: 'invalid id' },
    })
    expect(response.statusCode).toBe(404)
  })

  it('returns 400 if not enough stock', () => {
    const response = await placeOrderHandler({
      body: { orderId: 'out of stock id' },
    })
    expect(response.statusCode).toBe(400)
  })
})
