const { ipcMain, dialog } = require('electron')
const { db } = require('./db')
const randomstring = require('randomstring')
const path = require('path')
const fs = require('fs')
const PdfPrinter = require('pdfmake')

;(function startListen () {
  ipcMain.on('get-categories', event => {
    db.category.findAll({ raw: true }).then(categories => {
      event.sender.send('categories-reply', categories)
    })
  })

  ipcMain.on('get-parts', (event, categoryId) => {
    db.part
      .findAll({ where: { id_category: categoryId }, raw: true })
      .then(parts => {
        event.sender.send('get-parts-reply', parts)
      })
  })

  ipcMain.on('get-reports', event => {
    db.report.findAll({ raw: true }).then(reports => {
      event.sender.send('get-reports-reply', reports)
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
  })

  ipcMain.on('check-report-name', (event, name) => {
    db.report.findOne({ where: { name: name }, raw: true }).then(report => {
      event.sender.send('check-report-name-reply', !!report)
    })
  })

  ipcMain.on('save-part', (event, part) => {
    let dbPart = {
      name: part.name,
      hour: part.hour
    }
    db.part
      .findOne({ where: { name: part.name } })
      .then(part => {
        return new Promise((resolve, reject) => {
          if (!part) {
            return resolve()
          }
          reject(new Error('Сборка с таким именем уже существует.'))
        })
      })
      .then(() => {
        return db.category.findOne({ where: { name: part.category } })
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
      })
  })

  ipcMain.on('edit-part', async (event, part) => {
    const dbPart = await db.part.findOne({ where: { id: part.id }, raw: true })
    const existPart = await db.part.findOne({
      where: { name: part.name, id: { [db.Op.ne]: dbPart.id } },
      raw: true
    })
    if (existPart) {
      return event.sender.send(
        'error',
        'Cуществует другая сборка с таким именем'
      )
    }
    let dbCategory = await db.category.findOne({
      where: { name: part.category },
      raw: true
    })
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
  })

  ipcMain.on('generate-pdf', (event, report) => {
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
        let content = [{ text: 'Отчёт: ' + report.name }]
        let body = [
          [
            { text: 'Нaименование' },
            { text: 'Кол-во сборок' },
            { text: 'Кол-во часов' },
            { text: 'Сумма часов' }
          ]
        ]
        report.items.forEach(item => {
          let row = [
            item.part.name,
            item.count,
            item.part.hour,
            item.count * item.part.hour
          ]
          body.push(row)
        })
        let table = {
          table: {
            headerRows: 1,
            body: body
          }
        }
        content.push(table)
        content.push({ text: 'Итого: ' + report.sum })
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
      }
    )
  })
})()
