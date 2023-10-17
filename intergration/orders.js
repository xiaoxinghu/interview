// assume we have simply restful api wrappers correctly defined in `api.js`
import { deleteOrder, findOrder, placeOrder, updateOrder } from './api.js'

let orderId

describe('orders api', () => {

  test('I can place order', async () => {
    orderId = await placeOrder({
      userId: 1,
      productId: 1,
      quantity: 1,
    })
    expect(orderId).toBeGreaterThan(0)
  })

  test('I can modify my order', async () => {
    const result = await updateOrder({
      orderId,
      quantity: 2,
    })
    expect(result.success).toBe(true)
  })

  test('I can delete my orders', async () => {
    const result = await deleteOrder(orderId)
    expect(result.success).toBe(true)
    const order = await findOrder(orderId)
    expect(order).toBe(null)
  })
})
