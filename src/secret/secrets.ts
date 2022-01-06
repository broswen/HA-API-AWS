import { SecretsManagerClient, GetSecretValueCommandInput, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"

export interface RDSSecret {
  password: string
  engine: string
  port: number
  host: string
  dbname: string
  username: string
}

const smClient: SecretsManagerClient = new SecretsManagerClient({})
export async function getRDSSecret(arn: string): Promise<RDSSecret> {
  if (process.env.STAGE === 'local') {
    console.log('returning local test credentials')
    return {
      password: 'password',
      engine: '',
      port: 5432,
      host: 'localhost',
      dbname: 'postgres',
      username: 'postgres'
    }
  }
  const getSecretInput: GetSecretValueCommandInput = {
    SecretId: arn
  }

  const getSecretOutput = await smClient.send(new GetSecretValueCommand(getSecretInput))
  if (getSecretOutput.SecretString === undefined) {
    return {
      password: '',
      engine: '',
      port: 0,
      host: '',
      dbname: '',
      username: '',
    }
  }
  const rdsSecret: RDSSecret = JSON.parse(getSecretOutput.SecretString)
  return rdsSecret
}