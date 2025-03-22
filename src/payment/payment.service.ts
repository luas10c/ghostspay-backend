import { HttpException, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

import { database } from '#/database/drizzle.js'
import { customers, payments } from '#/database/schema.js'

@Injectable()
export class PaymentService {
  async getPaymentById(id: string) {
    const payment = await database
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1)

    if (!payment || !payment[0]) {
      throw new HttpException('Payment not found!', 404)
    }

    const customer = await database
      .select()
      .from(customers)
      .where(eq(customers.id, payment[0].customerId))
      .limit(1)

    return {
      method: payment[0].method,
      status: payment[0].status,
      expiresAt: payment[0].expiresAt,
      url: payment[0].url,
      amount: payment[0].amount,
      times: payment[0].times,
      customer: customer[0]
    }
  }

  async approvePayment(paymentId: string) {
    await database
      .update(payments)
      .set({
        status: 1
      })
      .where(eq(payments.id, paymentId))
  }
}
