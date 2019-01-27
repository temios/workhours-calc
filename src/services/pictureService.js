const { app } = window.require('electron').remote
const path = window.require('path')
const isDev = window.require('electron-is-dev')
const imagesPath = isDev
  ? 'images/' : path.resolve(app.getPath('exe'), '..', 'public/images') + '/'
const pictureService = {}

pictureService.getPath = () => {
  return imagesPath
}

pictureService.draftUrl = ''

pictureService.resetDraftUrl = () => {
  pictureService.draftUrl = ''
}

export default pictureService
