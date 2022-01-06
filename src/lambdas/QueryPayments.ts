"use strict";

import { APIGatewayProxyEventV2 } from "aws-lambda";
import { PaymentService } from "../service/PaymentService";

let paymentService: PaymentService
module.exports.handler = async (event: APIGatewayProxyEventV2) => {
  if (paymentService === undefined) {
    console.log('creating payment service')
    paymentService = new PaymentService()
  }
  if (!event.queryStringParameters?.source) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'must specify source id' })
    }
  }

  let limit = 100
  if (event.queryStringParameters?.limit) {
    limit = Math.max(parseInt(event.queryStringParameters.limit, 10), 1)
  }

  let offset = 0
  if (event.queryStringParameters?.offset) {
    offset = Math.max(parseInt(event.queryStringParameters.offset, 10), 0)
  }

  const source = event.queryStringParameters.source

  const queryOutput = await paymentService.QueryPayment({ limit: limit, offset, source })

  return {
    statusCode: 200,
    body: JSON.stringify(
      queryOutput
    )
  }

}