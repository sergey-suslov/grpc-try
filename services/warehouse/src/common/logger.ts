import * as pino from 'pino'

const APP_NAME = 'Warehouse'

export const loggerExpress = pino({
  name: APP_NAME,
  prettyPrint: true,
  level: 'debug',
})

export const logger = pino({
  name: APP_NAME,
  prettyPrint: true,
})
