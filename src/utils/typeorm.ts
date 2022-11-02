import { DataSource } from 'typeorm'
import { environment } from './environment'

interface SSLOptions {
  rejectUnauthorized?: boolean
}
let ssl: SSLOptions | undefined = undefined
if (environment.NODE_ENV === 'production') {
  ssl = {
    rejectUnauthorized: false,
  }
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environment.PGHOST,
  port: environment.PGPORT,
  username: environment.PGUSER,
  password: environment.PGPASSWORD,
  database: environment.PGDATABASE,
  synchronize: true,
  logging: ['error', 'migration'],
  entities: [__dirname + '/../models/*{.js,.ts}'],
  subscribers: [],
  migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  ssl,
})
