"use strict";

import { APIGatewayProxyEventV2 } from "aws-lambda"
import { getRDSSecret } from "../secret/secrets";


module.exports.handler = async (event: APIGatewayProxyEventV2) => {

  const rdsSecret = await getRDSSecret(process.env.POSTGRESSECRET ?? '')
  return {
    statusCode: 200,
    body: JSON.stringify(rdsSecret)
  }

}