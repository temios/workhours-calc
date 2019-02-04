const { ipcMain } = require('electron')
const { dbService } = require('./services/dbService')
const { pdfService } = require('./services/pdfService')
const { dirPublicPath } = require('./services/pathService')
const { stringHelper } = require('./helpers/stringHelper')
const path = require('path')
const fs = require('fs')
const { logger } = require('./logger')
const moment = require('moment')
const isDev = require('electron-is-dev')

;(function startListen () {
  logger.info('start app')
  let picturePath = path.join(isDev ? 'public' : dirPublicPath, 'images')

  ipcMain.on('get-categories', event => {
    dbService.getAllCategories().then(categories => {
      event.sender.send('categories-reply', categories)
    }).catch(err => {
      event.sender.send(
        'error',
        'Произошла ошибка во время выборки категорий.'
      )
      logger.error(err.message)
    })
  })

  ipcMain.on('get-parts', (event, categoryId) => {
    dbService.getCategoryParts(categoryId).then(parts => {
      event.sender.send('get-parts-reply', parts)
    }).catch(err => {
      event.sender.send(
        'error',
        'Произошла ошибка во время выборки сборок для категории.'
      )
      logger.error(err.message)
    })
  })

  ipcMain.on('get-reports', event => {
    dbService.getAllReports().then(reports => {
      event.sender.send('get-reports-reply', reports)
    }).catch(err => {
      event.sender.send('error', 'Произошла ошибка во время выборки отчётов.')
      logger.error(err.message)
    })
  })

  ipcMain.on('get-report-parts', async (event, report) => {
    try {
      const response = await dbService.getReportParts(report.id)
      event.sender.send('get-report-parts-reply', response)
    } catch (err) {
      event.sender.send(
        'error',
        'Произошла ошибка во время выборки сборок для отчёта.'
      )
      logger.error(err.message)
    }
  })

  ipcMain.on('check-report-name', (event, name) => {
    dbService.getAllReports().then(reports => {
      const report = stringHelper.findStringInArray(name, reports, 'name')
      event.sender.send('check-report-name-reply', !!report)
    }).catch(err => {
      event.sender.send(
        'error',
        'Произошла ошибка во время проверки имени отчёта.'
      )
      logger.error(err.message)
    })
  })

  ipcMain.on('save-part', (event, part) => {
    let dbPart = {
      name: part.name,
      hour: part.hour
    }
    dbService.getAllParts().then(parts => {
      return new Promise((resolve, reject) => {
        const existPart = stringHelper.findStringInArray(part.name, parts,
          'name')
        if (!existPart) {
          return resolve()
        }
        reject(new Error('Сборка с таким именем уже существует.'))
      })
    }).then(() => {
      return dbService.getAllCategories()
    }).then((categories) => {
      return stringHelper.findStringInArray(part.category, categories, 'name')
    }).then(category => {
      return new Promise(resolve => {
        if (!category) {
          dbService.createCategory(part.category).then(data => {
            let category = data.get({ plain: true })
            event.sender.send('add-category-reply', category)
            resolve(data)
          })
        } else {
          resolve(category)
        }
      })
    }).then(category => {
      let pictureName = stringHelper.generatePictureName(part.picture)
      let src = path.join(picturePath, pictureName)
      fs.copyFile(part.picture, src, err => {
        if (err) throw err
      })
      dbPart.id_category = category.id
      dbPart.picture = pictureName
      return dbService.createPart(dbPart)
    }).then(newPart => {
      event.sender.send('save-part-reply', newPart.get({ plain: true }))
    }).catch(err => {
      event.sender.send('error', err.message)
      logger.error(err.message)
    })
  })

  ipcMain.on('edit-part', async (event, part) => {
    try {
      const dbPart = await dbService.getPartById(part.id)
      const parts = await dbService.getPartsNotEqualId(dbPart.id)
      const existPart = stringHelper.findStringInArray(part.name, parts, 'name')
      if (existPart) {
        return event.sender.send(
          'error',
          'Cуществует другая сборка с таким именем'
        )
      }
      const categories = await dbService.getAllCategories()
      let dbCategory = stringHelper.findStringInArray(part.category, categories,
        'name')
      if (!dbCategory) {
        dbCategory = await dbService.createCategory(part.category)
        .then(category => {
            return Promise.resolve(category.get({ plain: true }))
          })
        event.sender.send('add-category-reply', dbCategory)
      }
      if (part.picture !== dbPart.picture) {
        let pictureName = stringHelper.generatePictureName(part.picture)
        let src = path.join(picturePath, pictureName)
        fs.copyFile(part.picture, src, err => {
          if (err) throw err
        })
        dbPart.picture = pictureName
      }
      dbPart.hour = part.hour
      dbPart.id_category = dbCategory.id
      dbPart.name = part.name
      const updated = await dbService.updatePart(part)
      if (updated) {
        return event.sender.send('edit-part-reply', dbPart)
      }
      return event.sender.send('error', 'Не удалось сохранить сборку.')
    } catch (err) {
      event.sender.send(
        'error',
        'Произошла ошибка во время редактирования сборки.'
      )
      logger.error(err.message)
    }
  })

  ipcMain.on('save-report', (event, report) => {
    let dbReport = {}
    let savedPicture = ''
    const date = moment().format('DD.MM.YYYY HH:mm:ss')
    dbService.getAllReports().then(reports => {
      return stringHelper.findStringInArray(report.name, reports, 'name')
    }).then(newReport => {
      if (!newReport || newReport.picture !== report.picture) { // TODO: Remove duplicate
        let pictureName = stringHelper.generatePictureName(report.picture)
        let src = path.join(picturePath, pictureName)
        fs.copyFile(report.picture, src, err => {
          if (err) throw err
        })
        savedPicture = pictureName
      }
      return newReport
    }).then(newReport => {
      if (!newReport) {
        dbReport.date_created = date
        return dbService.createReport(report.name, date, savedPicture)
      } else {
        newReport.date_updated = date
        newReport.name = report.name
        newReport.picture = savedPicture
        newReport.save()
        return newReport
      }
    }).then(newReport => {
      let currentReport = newReport.get({ plain: true })
      dbService.unlinkPartsFromReport(currentReport.id).then(() => {
        report.items.forEach(item => {
          dbService.createReportPart(currentReport.id, item.part.id, item.count)
        })
      })
      return currentReport
    }).then(newReport => {
      event.sender.send('save-report-reply', newReport)
    }).catch(err => {
      event.sender.send(
        'error',
        'Произошла ошибка во время выборки категорий.'
      )
      logger.error(err.message)
    })
  })

  ipcMain.on('generate-pdf', (event, report) => {
    try {
      if (pdfService.savePdf(report)) {
        event.sender.send('generate-pdf-reply', true)
      }
    } catch (err) {
      event.sender.send('error', 'Произошла ошибка во время создания pdf.')
      logger.error(err.message)
    }
  })
})()
