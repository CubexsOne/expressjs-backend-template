import { DataSource } from 'typeorm'
import { environment } from './environment'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environment.PGHOST,
  port: environment.PGPORT,
  username: environment.PGUSER,
  password: environment.PGPASSWORD,
  database: environment.PGDATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../models/*{.js,.ts}'],
  subscribers: [],
  migrations: [__dirname + '/../migrations/*{.js,.ts}'],
})
