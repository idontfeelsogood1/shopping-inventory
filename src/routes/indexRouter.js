const { Router } = require('express')
const route = Router()

const indexController = require('../controllers/indexController')
route.get('/', indexController.indexGet)

const itemController = require('../controllers/itemController')
route.get('/items', itemController.allItemGet)
route.get('/items/category/:category_id', itemController.categoryItemGet)
route.get('/items/create', itemController.createItemGet)
route.post('/items/create', itemController.createItemPost)
route.get('/items/:item_id/update', itemController.updateItemGet)
route.post('/items/:item_id/update', itemController.updateItemPost)
route.post('/items/:item_id/remove', itemController.removeItemPost)

