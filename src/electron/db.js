const Sequelize = require('sequelize')

const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: './work_hours.db'
})

// let file = path.join(__dirname, 'models/category')
// console.log(file)
// var models = {}
// fs.readdirSync(path.join(__dirname, 'models/')).forEach(function (filename) {
//   console.log(path.join(__dirname, 'models/', filename))
//   var model = {}
//   model.path = path.join(__dirname, 'models/', filename)
//   model.name = filename.replace(/\.[^/.]+$/, '')
//   model.resource = db.import(model.path)
//   models[model.name] = model
// })
db.category = db.import('./models/category')
db.part = db.import('./models/part')
db.reportPart = db.import('./models/report_part')
db.report = db.import('./models/report')

module.exports.db = db
