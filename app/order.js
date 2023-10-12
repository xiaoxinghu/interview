// lambda handler behind the place order endpoint
import db from '@nib/db' // this is a dynamodb interface
import email from '@nib/email' // this is a email interface

export async function handler(request) {
  const { body } = request
  const { orderId } = body

  // get the order info from the database
  const order = await db.findOrderById(orderId)
  if (!order) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Order not found' }),
    }
  }
  if (order.status !== 'placed') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Order already placed' }),
    }
  }

  /** @type {boolean} */
  const stillInStock = await db.checkStock(order)
  if (!stillInStock) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Not enough stock' }),
    }
  }

  // place the order
  const orderPlaced = await placeOrder(order)
  const result = await email.sendOrderConfirmation(orderPlaced)
  if (!result) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(orderPlaced),
  }
}
