const { app } = require('electron')
const path = require('path')

const exePath = app.getPath('exe')
const dirPath = path.resolve(exePath, '..')
const publicPath = path.resolve(dirPath, 'public')

module.exports.exePath = exePath
module.exports.dirPath = dirPath
module.exports.dirPublicPath = publicPath