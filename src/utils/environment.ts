import logger from './logger'

export const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PGHOST: process.env.PGHOST || '',
  PGPORT: parseToNumber(process.env.PGPORT),
  PGUSER: process.env.PGUSER || '',
  PGPASSWORD: process.env.PGPASSWORD || '',
  PGDATABASE: process.env.PGDATABASE || '',
}

function parseToArray(value: string | undefined): string[] {
  if (!value) {
    return []
  }

  return value.split(',')
}

function parseToNumber(value: string | undefined): number {
  if (!value) {
    return 5432
  }
  try {
    const parsedNumber = parseInt(value)
    if (parsedNumber.toString().length !== value.length) {
      throw new Error(`Value "${value}" parsed not successfully!`)
    }
    return parsedNumber
  } catch (error) {
    logger.error('parseToNumber:', error)
    return 5432
  }
}
