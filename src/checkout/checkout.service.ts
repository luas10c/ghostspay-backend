import { HttpException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'

import { database } from '#/database/drizzle.js'
import { customers, payments } from '#/database/schema.js'

import { env } from '#/common/env.js'

type CheckoutDTO = {
  amount: number
  method: number
  customer: {
    name: string
    document: string
    email: string
    phone: string
  }
}

@Injectable()
export class CheckoutService {
  async checkout({
    method,
    amount,
    customer: { name, document, email, phone }
  }: CheckoutDTO): Promise<{ checkout: { id: string } }> {
    if (method !== 0) {
      throw new HttpException('Somente pagamentos por pix', 400)
    }

    const response = await fetch('https://api.pronttus.com.br/v1/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': env.PRONTTUS_CLIENT_ID,
        'x-client-secret': env.PRONTTUS_CLIENT_SECRET
      },
      body: JSON.stringify({
        customer: {
          name,
          document,
          email,
          phone
        },
        amount, // esse valor será em centavos
        description: 'Pagamento via PIX'
      })
    })

    if (response.status >= 400 && response.status < 500) {
      const data = await response.json()
      throw new HttpException({ code: data.code, message: data.message }, 400)
    }

    const { transactionId, pixCode } = await response.json()

    const paymentId = randomUUID()
    await database.transaction(async (tx) => {
      let customerId: string
      const customer = await tx
        .select()
        .from(customers)
        .where(eq(customers.document, document))
        .limit(1)

      if (!customer || !customer[0]) {
        customerId = randomUUID()
        await tx.insert(customers).values({
          id: customerId,
          name,
          document,
          email,
          phone,
          createdAt: new Date()
        })
      } else {
        customerId = customer[0].id
      }

      await tx.insert(payments).values({
        id: paymentId,
        transactionId,
        method: 0,
        expiresAt: dayjs().add(1, 'day').toDate(),
        url: pixCode,
        amount,
        times: 1,
        customerId,
        status: 0,
        createdAt: new Date()
      })
    })

    return {
      checkout: {
        id: paymentId
      }
    }
  }
}
