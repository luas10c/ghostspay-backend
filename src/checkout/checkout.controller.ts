import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ValidationPipe } from '#/common/validation.js'

import { CheckoutService } from './checkout.service.js'

const schema = z.object({
  amount: z.coerce.number(),
  method: z.coerce.number(),
  customer: z.object({
    name: z.string().nonempty(),
    document: z.string().nonempty(),
    email: z.string().nonempty().email(),
    phone: z.string().nonempty()
  })
})

@Controller({
  path: '/checkout',
  version: '1'
})
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/')
  @UsePipes(new ValidationPipe(schema))
  async checkout(@Body() data: z.infer<typeof schema>) {
    console.log(data)

    /* const { checkout } = await this.checkoutService.checkout({
      amount,
      method,
      customer
    })

    return {
      checkout
    } */
  }
}
