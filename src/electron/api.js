const { ipcMain } = require('electron')
const { db } = require('./db')
const randomstring = require('randomstring')
const path = require('path')
const fs = require('fs')

;(function startListen () {
  ipcMain.on('get-categories', event => {
    let categories = db.category.findAll()
    console.log(categories)
    event.sender.send('categories-reply', categories)
  })

  ipcMain.on('create-category', (event, arg) => {
    db.category.create({ name: arg }).then(category => {
      event.sender.send('category-add-reply', category)
    })
  })

  ipcMain.on('save-part', (event, part) => {
    let dbPart = {
      name: part.name,
      hour: part.hours
    }
    if (part.id !== 0) {
      dbPart.id = part.id
    }
    db.category.findOne({ where: { name: part.name } }).then(category => {
      console.log(category)
      return new Promise((resolve, reject) => {
        if (category === undefined) {
          db.category.create({ name: part.name }).then(data => resolve(data))
        }
        resolve(category)
      })
    }).then((category) => {
      let pictureName = randomstring.generate(32) + '.' + part.picture.split('.').pop()
      let src = path.resolve(
        'public/images/',
        pictureName
      )
      fs.copyFile(part.picture, src, err => {
        if (err) throw err
      })
      dbPart.id_category = category.id
      dbPart.picture = pictureName
      return db.part.create(dbPart)
    }).then((newPart) => {
      event.sender.send('save-part-reply', newPart.get({plain: true}))
    })
  })
})()
