"use strict";

import { APIGatewayProxyEventV2 } from "aws-lambda"
import { PaymentService } from "../service/PaymentService";

let paymentService: PaymentService
module.exports.handler = async (event: APIGatewayProxyEventV2) => {
  if (paymentService === undefined) {
    console.log('creating payment service')
    paymentService = new PaymentService()
  }

  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'must specify payment id' })
    }
  }

  const id = event.pathParameters.id
  console.log(`finding payment: ${id}`)
  const paymentOutput = await paymentService.GetPayment({ id })
  console.log(paymentOutput)

  if (!paymentOutput.payment) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'payment not found' })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(paymentOutput)
  }

}