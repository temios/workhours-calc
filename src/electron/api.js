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
    let dbPart = db.part.create({
      name: part.name,
      hour: part.hours
    })
    if (part.id !== 0) {
      dbPart.id = part.id
    }
    let category
    db.category.findAll({ where: { name: part.name } }).then(data => {
      console.log(data)
      category = data[0]
      return category
    }).then(category => {
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
      dbPart.category = category.id
      dbPart.picture = pictureName
      return dbPart.save()
    }).then(newPart => {
      event.sender.send('save-part-reply', newPart)
    })
  })
})()
