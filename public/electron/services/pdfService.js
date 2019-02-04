const { dialog } = require('electron')
const moment = require('moment')
const path = require('path')
const fs = require('fs')
const PdfPrinter = require('pdfmake')
const isDev = require('electron-is-dev')
const { dirPublicPath } = require('./pathService')

const pdfService = {}

pdfService.savePdf = (report) => {
  let result = false;
  let fontsPath = path.resolve(
    isDev ? path.resolve(__dirname, '..') : dirPublicPath, 'fonts'
  )
  dialog.showSaveDialog(
    null,
    {
      filters: [
        {
          name: 'Adobe PDF',
          extensions: ['pdf']
        }
      ],
      defaultPath: report.name
    },
    savePath => {
      if (savePath) {
        let content = [
          {
            text: 'Наименование изделия: ' + report.name,
            bold: true,
            fontSize: 15,
            margin: [0, 10]
          },
          {
            text: 'Количество сборок: ' + report.items.length,
            bold: true,
            fontSize: 15,
            margin: [0, 10]
          },
          {
            text: 'Дата: ' +
              moment(report.date_updated, 'DD.MM.YYYY HH:mm:ss')
              .format('DD.MM.YYYY'),
            bold: true,
            fontSize: 15,
            margin: [0, 10]
          }
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
            Number.parseFloat((item.count * item.part.hour).toFixed(2)) +
            ' ч/ч'
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
        content.push({
          text: 'Итого: ' + report.sum + ' ч/ч',
          bold: true,
          fontSize: 15,
          margin: [0, 10]
        })
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
        result = true
      }
    }
  )
  return result
}

module.exports.pdfService = pdfService