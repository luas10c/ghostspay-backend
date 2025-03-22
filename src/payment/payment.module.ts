import { Module } from '@nestjs/common'

import { PaymentController } from './payment.controller.js'
import { PaymentService } from './payment.service.js'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
