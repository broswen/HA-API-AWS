import { PostPaymentCommandInput, GetPaymentCommandOutput, PostPaymentCommandOutput, QueryPaymentCommandInput, QueryPaymentCommandOutput } from "../model/models"


export interface PaymentService {
  GetPayment(input: PostPaymentCommandInput): Promise<GetPaymentCommandOutput>
  PostPayment(input: PostPaymentCommandInput): Promise<PostPaymentCommandOutput>
  QueryPayment(input: QueryPaymentCommandInput): Promise<QueryPaymentCommandOutput>
}

export class PaymentService {
  constructor() {
  }
}


