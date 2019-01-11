const { ipcMain } = require('electron')
const { db } = require('./db')
const randomstring = require('randomstring')
const path = require('path')
const fs = require('fs')

;(function startListen () {
  ipcMain.on('get-categories', event => {
    db.category.findAll({ raw: true }).then(categories => {
      event.sender.send('categories-reply', categories)
    })
  })

  ipcMain.on('get-parts', (event, categoryId) => {
    db.part.findAll({ where: { id_category: categoryId }, raw: true }).then((parts) => {
      console.log(parts)
      event.sender.send('get-parts-reply', parts)
    })
  })

  ipcMain.on('save-part', (event, part) => {
    let dbPart = {
      name: part.name,
      hour: part.hour
    }
    if (part.id !== 0) {
      dbPart.id = part.id
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
        return new Promise((resolve, reject) => {
          if (!category) {
            db.category.create({ name: part.name }).then(data => {
              let category = data.get({ plain: true })
              event.sender.send('category-add', category)
              resolve(data)
            })
          }
          resolve(category)
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
        let res = newPart.get({ plain: true })
        res.category = part.category
        event.sender.send('save-part-reply', res)
      })
      .catch(err => {
        event.sender.send('error', err.message)
      })
  })
})()
