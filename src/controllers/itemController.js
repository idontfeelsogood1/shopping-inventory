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

module.exports = {
    allItemGet,
    categoryItemGet,
}