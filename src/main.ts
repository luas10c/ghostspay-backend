import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'

const app = await NestFactory.create(AppModule, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  }
})

app.enableVersioning()

app.listen(7000, '0.0.0.0')
