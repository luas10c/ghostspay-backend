import { Module } from '@nestjs/common'

import { database } from './database/drizzle.js'

import { CheckoutModule } from './checkout/checkout.module.js'
import { PaymentModule } from './payment/payment.module.js'

@Module({
  imports: [CheckoutModule, PaymentModule]
})
export class AppModule {
  async onModuleInit() {
    await database.execute('SELECT 1=1')
  }
}
