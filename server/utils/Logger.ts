import { format } from 'winston'
import * as winston from 'winston'

const Log = winston.createLogger({
  format: format.combine(
    format.splat(),
    format.timestamp(),
    format.colorize({ all: true }),
    format.json(),
    // format.errors({ stack: true }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.LOGLEVEL || 'debug',
      handleExceptions: true,
    }),
  ],
})

if (process.env.NODE_ENV === 'production') {
  Log.add(
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  )
}

export { Log }
