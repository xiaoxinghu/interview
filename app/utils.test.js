import { isValidCouponCode } from './utils'

describe('coupon code', () => {
  test('I can verify coupon code', () => {
    expect(isValidCouponCode('0001')).toBe(true)
    expect(isValidCouponCode('0002')).toBe(false)
  })
})
