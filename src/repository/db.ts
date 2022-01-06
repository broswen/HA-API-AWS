"use strict"
import { Client, Pool } from 'pg'
import { getRDSSecret, RDSSecret } from "../secret/secrets"



let secret: RDSSecret | undefined
let pool: Pool

export async function getPool(): Promise<Pool> {
  if (pool === undefined) {
    if (secret === undefined) {
      secret = await getRDSSecret(process.env.POSTGRESSECRET ?? '')
      if (secret == undefined) {
        throw new Error('secret is undefined')
      }
    }
    pool = new Pool({
      host: secret.host,
      port: secret.port,
      database: secret.dbname,
      user: secret.username,
      password: secret.password,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 5000,
      max: 1,
    })
  }
  return pool
}