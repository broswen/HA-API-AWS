"use strict";

import { APIGatewayProxyEventV2 } from "aws-lambda"
import { getRDSSecret, RDSSecret } from "../secret/secrets";
import { PaymentService } from "../service/PaymentService";


const paymentService: PaymentService = new PaymentService()
module.exports.handler = async (event: APIGatewayProxyEventV2) => {
  // const credentials: RDSSecret = await getRDSSecret(process.env.POSTGRESSECRET ?? '')
  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'must specify payment id' })
    }
  }

  const id = event.pathParameters.id

  const paymentOutput = await paymentService.GetPayment({ id })

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