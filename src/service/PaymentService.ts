import { prisma, PrismaClient } from "@prisma/client"
import { PostPaymentCommandInput, GetPaymentCommandOutput, PostPaymentCommandOutput, QueryPaymentCommandInput, QueryPaymentCommandOutput, GetPaymentCommandInput } from "../model/models"
import { getRDSSecret, RDSSecret } from "../secret/secrets"


export interface PaymentService {
  GetPayment(input: GetPaymentCommandInput): Promise<GetPaymentCommandOutput>
  PostPayment(input: PostPaymentCommandInput): Promise<PostPaymentCommandOutput>
  QueryPayment(input: QueryPaymentCommandInput): Promise<QueryPaymentCommandOutput>
}

export class PaymentService implements PaymentService {
  prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }

  async GetPayment(input: GetPaymentCommandInput): Promise<GetPaymentCommandOutput> {
    const payment = await this.prisma.payment.findFirst({ where: { id: input.id } })
    return {
      payment
    }
  }

  async PostPayment(input: PostPaymentCommandInput): Promise<PostPaymentCommandOutput> {
    const payment = await this.prisma.payment.create({ data: input })
    return {
      id: payment.id
    }
  }

  async QueryPayment(input: QueryPaymentCommandInput): Promise<QueryPaymentCommandOutput> {
    const payments = await this.prisma.payment.findMany({
      where: {
        source: input.source,
        destination: input.destination,
      },
      skip: input.limit * input.offset,
      take: input.limit
    })

    return {
      payments,
      paymentCount: payments.length
    }
  }
}


