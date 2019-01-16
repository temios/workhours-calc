const log4js = require('log4js')
const isDev = require('electron-is-dev')
const path = require('path')
const { dirPath } = require('./helper')

const fileName = 'application.log'
const pathToFile = isDev ? fileName : path.join(dirPath, fileName)

log4js.configure({
  appenders: { app: { type: 'file', filename: pathToFile } },
  categories: { default: { appenders: ['app'], level: 'debug' } }
})

module.exports.logger = log4js.getLogger('app')
