import { TransformableInfo } from 'logform'
import { createLogger, format, Logger, transports } from 'winston'

const logger: Logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.align(),
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:SS' }),
    format.printf(
      (info: TransformableInfo) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : ' ')
    )
  ),
  level: 'info',
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
  ],
})

export default logger
