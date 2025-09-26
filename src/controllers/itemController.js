const db = require('../db/queries')

async function allItemGet(req, res) {
    const arr = await db.getAllItems()
    res.render('items', { items: arr })
}

async function categoryItemGet(req, res) {
    const id = req.params.category_id
    const name = await db.getCategoryName(id)
    const arr = await db.getCategoryItems(id)
    res.render('category', { items: arr, category_name: name })
}

function createItemGet(req, res) {
    res.render('createItem')
}

async function createItemPost(req, res) {
    if (!await db.categoryExisted(req.body.category)) {
        await db.addCategory(req.body.category)
    }

    const category_id = await db.getCategoryId(req.body.category)
    const img_path = '/item_images/' + req.file.filename
    
    const item = {
        name: req.body.name,
        img_path: img_path,
        price: req.body.price,
        category_id: category_id
    }

    await db.addItem(item)
    res.redirect('/items')
}


async function updateItemGet(req, res) {
    const item = await db.getItem(req.params.item_id)
    res.render('updateItem', { item: item })
}

// TODO:
async function updateItemPost(req, res) {
    await db.updateItem(req)
    res.redirect('/items')
}

module.exports = {
    allItemGet,
    categoryItemGet,
    createItemGet,
    createItemPost,
    updateItemGet,
    updateItemPost,
}