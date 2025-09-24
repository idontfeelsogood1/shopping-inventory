const { Router } = require('express')
const route = Router()
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'item_images'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage: storage })

const indexController = require('../controllers/indexController')
route.get('/', indexController.indexGet)

const itemController = require('../controllers/itemController')
route.get('/items', itemController.allItemGet)
route.get('/items/category/:category_id', itemController.categoryItemGet)
route.get('/items/create', itemController.createItemGet)
route.post('/items/create', upload.single('image'), itemController.createItemPost)
// route.get('/items/:item_id/update', itemController.updateItemGet)
// route.post('/items/:item_id/update', itemController.updateItemPost)
// route.post('/items/:item_id/remove', itemController.removeItemPost)

module.exports = route