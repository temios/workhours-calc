const { db } = require('../db')
const dbService = {}

/**
 * Get all categories from db
 * @returns {Promise<Array<Model>>}
 */
dbService.getAllCategories = () => {
  return db.category.findAll({ raw: true })
}

/**
 * Get all parts by category id
 * @param id
 * @returns {Promise<Array<Model>>}
 */
dbService.getCategoryParts = id => {
  return db.part.findAll({ where: { id_category: id }, raw: true })
}

/**
 * Get all report from db
 * @returns {Promise<Array<Model>>}
 */
dbService.getAllReports = () => {
  return db.report.findAll({ raw: true })
}

/**
 *
 * @param id
 * @returns {Promise<any[]>}
 */
dbService.getReportParts = async id => {
  const dbParts = await db.part.findAll({
    include: [{ model: db.reportPart, where: { id_report: id } }],
    raw: true
  })
  return dbParts.map(part => {
    let item = {}
    item.count = part['report_parts.count']
    item.part = {
      hour: part.hour,
      picture: part.picture,
      name: part.name,
      id_category: part.id_category,
      id: part.id
    }
    return item
  })
}

/**
 * Get all parts from db
 * @returns {Promise<Array<Model>>}
 */
dbService.getAllParts = () => {
  return db.part.findAll({ raw: true })
}

/**
 * Get all parts except one
 * @param id
 * @returns {Promise<Array<Model>>}
 */
dbService.getPartsNotEqualId = id => {
  return db.part.findAll({
    id: { [db.Op.ne]: id },
    raw: true
  })
}

/**
 * Create category
 * @param name
 * @returns Promise
 */
dbService.createCategory = name => {
  return db.category.create({ name: name })
}

/**
 * Get part by id
 * @param id
 * @returns {Promise<Model>}
 */
dbService.getPartById = id => {
  return db.part.findOne({
    where: { id: id },
    raw: true
  })
}

/**
 * Create part
 * @param part
 * @returns Promise
 */
dbService.createPart = part => {
  return db.part.create(part)
}

/**
 * Update part
 * @param part
 * @returns Promise
 */
dbService.updatePart = part => {
  return db.part.update(part, { where: { id: part.id } })
}

/**
 * Create report
 * @param name
 * @param date
 * @param picture
 * @return {Promise}
 */
dbService.createReport = (name, date, picture) => {
  return db.report.create({
    name: name,
    date_updated: date,
    picture: picture
  })
}

/**
 * Create link between report and part
 * @param id_report
 * @param id_part
 * @param count
 * @return {Promise}
 */
dbService.createReportPart = (id_report, id_part, count) => {
  db.reportPart.create({
    id_report: id_report,
    id_part: id_part,
    count: count
  })
}

/**
 * Remove link between part and report
 * @param idReport
 * @returns Promise
 */
dbService.unlinkPartsFromReport = idReport => {
  return db.reportPart.destroy(
    { where: { id_report: idReport } }
  )
}

module.exports.dbService = dbService