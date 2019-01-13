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

db.category = db.import('./models/category')
db.part = db.import('./models/part')
db.reportPart = db.import('./models/report_part')
db.report = db.import('./models/report')

db.part.hasMany(db.reportPart, {foreignKey: 'id_part'})
db.report.hasMany(db.reportPart, {foreignKey: 'id_report'})
db.report.belongsToMany(db.part, {through: db.reportPart, foreignKey: 'id_part'})
db.part.belongsToMany(db.report, {through: db.reportPart, foreignKey: 'id_report'})

module.exports.db = db
