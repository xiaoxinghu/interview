import { isValidCouponCode } from './utils'

describe('coupon code', () => {
  test('I can verify coupon code', () => {
    expect(isValidCouponCode('OCT2023')).toBe(true)
    expect(isValidCouponCode('JAN2024')).toBe(false)
  })
})
