const db = require('../db/queries')

async function allItemGet(req, res) {
    const items = await db.getAllItems()
    res.render('items', { items: items })
}

module.exports = {
    allItemGet,
}