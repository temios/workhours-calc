const log4js = require('log4js')
const path = require('path')
log4js.configure({
  appenders: { app: { type: 'file', filename: path.join(__dirname, 'application.log') } },
  categories: { default: { appenders: ['app'], level: 'debug' } }
})

module.exports.logger = log4js.getLogger('app')
