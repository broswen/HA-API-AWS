"use strict";

import { APIGatewayProxyEventV2 } from "aws-lambda";

module.exports.handler = async (event: APIGatewayProxyEventV2) => {

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "OK"
      })
  }

}