import { Controller, Get, Put, Param } from '@nestjs/common'

import { PaymentService } from './payment.service.js'
@Controller({
  path: '/payment',
  version: '1'
})
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/:paymentId')
  async getPaymentById(@Param('paymentId') paymentId: string) {
    const payment = await this.paymentService.getPaymentById(paymentId)
    return {
      payment
    }
  }

  @Put('/:paymentId/approve')
  async approvePayment(@Param('paymentId') paymentId: string) {
    await this.paymentService.approvePayment(paymentId)
  }
}
