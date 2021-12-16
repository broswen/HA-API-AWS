import { Client } from "pg"
import { PostPaymentCommandInput, GetPaymentCommandOutput, PostPaymentCommandOutput, QueryPaymentCommandInput, QueryPaymentCommandOutput, GetPaymentCommandInput, Payment } from "../model/models"
import { v4 as uuidv4 } from 'uuid'


export interface PaymentService {
  GetPayment(input: GetPaymentCommandInput): Promise<GetPaymentCommandOutput>
  PostPayment(input: PostPaymentCommandInput): Promise<PostPaymentCommandOutput>
  QueryPayment(input: QueryPaymentCommandInput): Promise<QueryPaymentCommandOutput>
}

export class PaymentService implements PaymentService {
  client: Client
  constructor(client: Client) {
    this.client = client
  }

  async GetPayment(input: GetPaymentCommandInput): Promise<GetPaymentCommandOutput> {
    const result = await this.client.query('select * from payment where id = $1 limit 1;', [input.id])
    if (result.rowCount < 1) {
      return {
        payment: null
      }
    }

    const payment: Payment = {
      id: result.rows[0]['id'],
      source: result.rows[0]['source'],
      destination: result.rows[0]['destination'],
      amount: result.rows[0]['amount'],
      date: result.rows[0]['date'],
    }
    return {
      payment
    }
  }

  async PostPayment(input: PostPaymentCommandInput): Promise<PostPaymentCommandOutput> {
    const id = uuidv4()
    const result = await this.client.query('insert into payment (id, source, destination, amount ,date) values ($1, $2, $3, $4, $5);',
      [id, input.source, input.destination, input.amount, input.date])

    if (result.rowCount < 1) {
      return {
        id
      }
    }

    return { id }
  }

  async QueryPayment(input: QueryPaymentCommandInput): Promise<QueryPaymentCommandOutput> {
    const result = await this.client.query('select * from payment where source = $1 limit $2 offset $3;',
      [input.source, input.limit, input.offset])

    const payments = result.rows.map(row => ({
      id: row['id'],
      source: row['source'],
      destination: row['destination'],
      amount: row['amount'],
      date: row['date']
    }))

    return {
      paymentCount: result.rowCount,
      payments
    }
  }
}


