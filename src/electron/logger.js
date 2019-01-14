const log4js = require('log4js')
log4js.configure({
  appenders: { app: { type: 'file', filename: 'application.log' } },
  categories: { default: { appenders: ['app'], level: 'debug' } }
})

module.exports.logger = log4js.getLogger('app')
