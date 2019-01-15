const { ipcMain, dialog } = require('electron')
const { db } = require('./db')
const randomstring = require('randomstring')
const path = require('path')
const fs = require('fs')
const PdfPrinter = require('pdfmake')
const { logger } = require('./logger')

;(function startListen () {
  ipcMain.on('get-categories', event => {
    db.category
      .findAll({ raw: true })
      .then(categories => {
        event.sender.send('categories-reply', categories)
      })
      .catch(err => {
        event.sender.send(
          'error',
          'Произошла ошибка во время выборки категорий.'
        )
        logger.error(err.message)
      })
  })

  ipcMain.on('get-parts', (event, categoryId) => {
    db.part
      .findAll({ where: { id_category: categoryId }, raw: true })
      .then(parts => {
        event.sender.send('get-parts-reply', parts)
      })
      .catch(err => {
        event.sender.send(
          'error',
          'Произошла ошибка во время выборки сборок для категории.'
        )
        logger.error(err.message)
      })
  })

  ipcMain.on('get-reports', event => {
    db.report
      .findAll({ raw: true })
      .then(reports => {
        event.sender.send('get-reports-reply', reports)
      })
      .catch(err => {
        event.sender.send('error', 'Произошла ошибка во время выборки отчётов.')
        logger.error(err.message)
      })
  })

  ipcMain.on('get-report-parts', (event, report) => {
    db.part
      .findAll({
        include: [{ model: db.reportPart, where: { id_report: report.id } }],
        raw: true
      })
      .then(parts => {
        let response = parts.map(part => {
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
        event.sender.send('get-report-parts-reply', response)
      })
      .catch(err => {
        event.sender.send(
          'error',
          'Произошла ошибка во время выборки сборок для отчёта.'
        )
        logger.error(err.message)
      })
  })

  ipcMain.on('check-report-name', (event, name) => {
    db.report
      .findOne({ where: { name: name }, raw: true })
      .then(report => {
        event.sender.send('check-report-name-reply', !!report)
      })
      .catch(err => {
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
    db.part
      .findAll({ raw: true })
      .then(parts => {
        return new Promise((resolve, reject) => {
          const existPart = findStr(part.name, parts, 'name')
          if (!existPart) {
            return resolve()
          }
          reject(new Error('Сборка с таким именем уже существует.'))
        })
      })
      .then(() => {
        return db.category.findAll({ raw: true })
      }).then((categories) => {
        return findStr(part.category, categories, 'name')
      })
      .then(category => {
        return new Promise(resolve => {
          if (!category) {
            db.category.create({ name: part.name }).then(data => {
              let category = data.get({ plain: true })
              event.sender.send('add-category-reply', category)
              resolve(data)
            })
          } else {
            resolve(category)
          }
        })
      })
      .then(category => {
        let pictureName =
          randomstring.generate(32) + '.' + part.picture.split('.').pop()
        let src = path.resolve('public/images/', pictureName)
        fs.copyFile(part.picture, src, err => {
          if (err) throw err
        })
        dbPart.id_category = category.id
        dbPart.picture = pictureName
        return db.part.create(dbPart)
      })
      .then(newPart => {
        event.sender.send('save-part-reply', newPart.get({ plain: true }))
      })
      .catch(err => {
        event.sender.send('error', err.message)
        logger.error(err.message)
      })
  })

  ipcMain.on('edit-part', async (event, part) => {
    try {
      const dbPart = await db.part.findOne({
        where: { id: part.id },
        raw: true
      })
      const parts = await db.part.findAll({
        where: { id: { [db.Op.ne]: dbPart.id } },
        raw: true
      })
      const existPart = findStr(part.name, parts, 'name')
      if (existPart) {
        return event.sender.send(
          'error',
          'Cуществует другая сборка с таким именем'
        )
      }
      const categories = await db.category.findAll({ raw: true })
      let dbCategory = findStr(part.category, categories, 'name')
      if (!dbCategory) {
        dbCategory = await db.category
          .create({ name: part.name })
          .then(category => {
            return Promise.resolve(category.get({ plain: true }))
          })
        event.sender.send('add-category-reply', dbCategory)
      }
      if (part.picture !== dbPart.picture) {
        let pictureName =
          randomstring.generate(32) + '.' + part.picture.split('.').pop()
        let src = path.resolve('public/images/', pictureName)
        fs.copyFile(part.picture, src, err => {
          if (err) throw err
        })
        dbPart.picture = pictureName
      }
      dbPart.hour = part.hour
      dbPart.id_category = dbCategory.id
      dbPart.name = part.name
      const updated = await db.part.update(dbPart, { where: { id: dbPart.id } })
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
    dbReport.name = report.name
    let where = { name: report.name }
    db.report
      .findOrCreate({
        where: where
      })
      .then(newReport => {
        // TODO: fix date bug
        let currentReport = newReport[0].get({ plain: true })
        db.reportPart
          .destroy({ where: { id_report: currentReport.id } })
          .then(() => {
            report.items.forEach(item => {
              let dbReportPart = {
                id_report: currentReport.id,
                id_part: item.part.id,
                count: item.count
              }
              db.reportPart.create(dbReportPart)
            })
          })
        return currentReport
      })
      .then(newReport => {
        event.sender.send('save-report-reply', newReport)
      })
      .catch(err => {
        event.sender.send(
          'error',
          'Произошла ошибка во время выборки категорий.'
        )
        logger.error(err.message)
      })
  })

  ipcMain.on('generate-pdf', (event, report) => {
    try {
      dialog.showSaveDialog(
        null,
        {
          filters: [
            {
              name: 'Adobe PDF',
              extensions: ['pdf']
            }
          ]
        },
        savePath => {
          let content = [
            { text: 'Наименование изделия: ' + report.name, bold: true, fontSize: 15, margin: [0, 10] },
            { text: 'Количество сборок:' + report.items.length, bold: true, fontSize: 15, margin: [0, 10] }
          ]
          let body = [
            [
              { text: '#' },
              { text: 'Трудоемкость' },
              { text: 'Нaименование сборки' },
              { text: 'Кол-во' },
              { text: 'Сумма часов' }
            ]
          ]
          report.items.forEach((item, i) => {
            let row = [
              ++i,
              item.part.hour + ' ч/ч',
              item.part.name,
              item.count + ' шт.',
              (item.count * item.part.hour) + ' ч/ч'
            ]
            body.push(row)
          })
          let table = {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', '*', 'auto', 'auto'],
              body: body
            }
          }
          content.push(table)
          content.push({ text: 'Итого: ' + report.sum + ' ч/ч', bold: true, fontSize: 15, margin: [0, 10] })
          let fontsPath = path.resolve(__dirname, '../../public/fonts')
          let fonts = {
            Roboto: {
              normal: path.resolve(fontsPath, 'Roboto-Regular.ttf'),
              bold: path.resolve(fontsPath, 'Roboto-Medium.ttf'),
              italics: path.resolve(fontsPath, 'Roboto-Italic.ttf'),
              bolditalics: path.resolve(fontsPath, 'Roboto-MediumItalic.ttf')
            }
          }
          let printer = new PdfPrinter(fonts)
          let pdf = printer.createPdfKitDocument({ content: content })
          pdf.pipe(fs.createWriteStream(savePath))
          pdf.end()
          event.sender.send('generate-pdf-reply', true)
        }
      )
    } catch (err) {
      event.sender.send('error', 'Произошла ошибка во время создания pdf.')
      logger.error(err.message)
    }
  })

  function findStr (needle, arr, field) {
    const modifyNeedle = needle.toLowerCase().trim()
    return arr.find(item => {
      return item[field].toLowerCase().trim() === modifyNeedle
    })
  }
})()
