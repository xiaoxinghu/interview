import db from '@nib/db'
/**
 * @typedef Coupon
 * @property {string} code
 * @property {number} discount
 *  discount, e.g. 0.1 for 10% off
 * @property {string} startDate
 * @property {string} endDate
 *
 * e.g. this is what we get from the database:
 * @example
[
  {
    code: '0001',
    discount: 0.1,
    startDate: '2023-10-01T00:00:00.000Z',
    endDate: '2023-12-01T00:00:00.000Z',
  },
  {
    code: '0002',
    discount: 0.1,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-02-01T00:00:00.000Z',
  },
]
 */

export async function isValidCouponCode(code) {
  /** @type {Coupon[]} */
  const coupons = await db.getCoupons()
  const coupon = coupons.find((coupon) => coupon.code === code)
  if (!coupon) return false
  const now = new Date()
  const startDate = new Date(coupon.startDate)
  const endDate = new Date(coupon.endDate)
  if (now < startDate || now > endDate) return false
  return true
}
