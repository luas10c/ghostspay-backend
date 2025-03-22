import { NestFactory } from '@nestjs/core'
import { apiReference } from '@scalar/nestjs-api-reference'
import { createDocument } from 'zod-openapi'
import { z } from 'zod'

import { AppModule } from './app.module.js'

import { env } from './common/env.js'

const app = await NestFactory.create(AppModule, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  }
})

app.enableVersioning()

const content = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'GhostsPay',
    version: '0.0.1'
  },
  paths: {
    '/checkout': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: z.object({
                amount: z.coerce.number(),
                method: z.string(),
                customer: z.object({
                  name: z.string().nonempty(),
                  document: z.string().nonempty(),
                  email: z.string().nonempty().email(),
                  phone: z.string().nonempty()
                })
              })
            }
          }
        },
        responses: {
          '200': {
            description: '200 OK',
            content: {
              'application/json': {
                schema: z.object({
                  checkout: z.object({
                    id: z.string()
                  })
                })
              }
            }
          }
        }
      }
    },
    '/payment/:paymentId': {
      get: {
        responses: {
          '200': {
            description: '200 OK',
            content: {
              'application/json': {
                schema: z.object({
                  transactionId: z.string(),
                  name: z.string(),
                  document: z.string(),
                  email: z.string(),
                  phone: z.string(),
                  method: z.string(),
                  times: z.number(),
                  status: z.string()
                })
              }
            }
          }
        }
      }
    },
    '/payment/:paymentId/approve': {
      post: {
        requestParams: {
          path: z.object({
            paymentId: z.string()
          })
        },
        responses: {
          '204': {
            description: '204 Not Content'
          }
        }
      }
    }
  }
})

app.use(
  '/docs',
  apiReference({
    theme: 'purple',
    metaData: {
      title: 'GhostsPay'
    },
    content
  })
)

app.listen(env.PORT, '0.0.0.0')
