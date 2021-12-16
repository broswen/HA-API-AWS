"use strict"
import { Client } from 'pg'
import { getRDSSecret, RDSSecret } from "../secret/secrets"


let client: Client
export const connect = async () => {
  const secret: RDSSecret = await getRDSSecret(process.env.POSTGRESSECRET || '')
  if (client === undefined) {

    client = await new Client({
      host: secret.host,
      user: secret.username,
      password: secret.password,
      database: 'postgres',
      port: secret.port
    })
    console.log('connecting with', secret)
    await client.connect()
  }

  return client
}