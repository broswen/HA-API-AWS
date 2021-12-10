export interface PostPaymentCommandInput {
  source: string
  destination: string
  amount: number
  date: Date
}

export interface PostPaymentCommandOutput {
  id: string
}

export interface GetPaymentCommandInput {
  id: string
}

export interface GetPaymentCommandOutput {
  id: string
  source: string
  destination: string
  amount: number
  date: Date
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
  date: Date
}