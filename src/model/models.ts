import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
const ajv = new Ajv()
addFormats(ajv)

export interface PostPaymentCommandInput {
  source: string
  destination: string
  amount: number
  date: string
}

export interface PostPaymentCommandOutput {
  id: string
}

export interface GetPaymentCommandInput {
  id: string
}

export interface GetPaymentCommandOutput {
  payment: Payment | null
}

export interface QueryPaymentCommandInput {
  limit: number
  offset: number
  source?: string
  destination?: string
  fromDate?: Date
  toDate?: Date
}

export interface QueryPaymentCommandOutput {
  paymentCount: number
  payments: Payment[]
}

export interface Payment {
  id: string
  source: string
  destination: string
  amount: number
  date: string
}

const paymentSchema: JSONSchemaType<Payment> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    source: { type: 'string', minLength: 1 },
    destination: { type: 'string', minLength: 1 },
    amount: { type: 'number', exclusiveMinimum: 0 },
    date: { type: 'string', format: 'date' },
  },
  required: ['source', 'destination', 'amount', 'date'],
  additionalProperties: false
}

export const validatePayment = ajv.compile(paymentSchema)
