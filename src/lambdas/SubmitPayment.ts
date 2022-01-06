"use strict";

import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Payment } from "../model/models";
import { PaymentService } from "../service/PaymentService";


let paymentService: PaymentService
module.exports.handler = async (event: APIGatewayProxyEventV2) => {
  if (paymentService === undefined) {
    console.log('creating payment service')
    paymentService = new PaymentService()
  }

  if (event.body === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'body is null' })
    }
  }

  const payment = JSON.parse(event.body) as Payment

  const postOutput = await paymentService.PostPayment(payment)

  return {
    statusCode: 200,
    body: JSON.stringify(postOutput)
  }

}