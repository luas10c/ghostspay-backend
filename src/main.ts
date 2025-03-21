import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'

import { env } from './common/env.js'

const app = await NestFactory.create(AppModule, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  }
})

app.enableVersioning()

app.listen(env.PORT, '0.0.0.0')
