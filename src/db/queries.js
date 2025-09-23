const db = require('./pool')

async function getAllItems() {
    const { rows } = await db.query(`
        SELECT item.id AS item_id, category.id AS category_id, item.name, price, img_path, category.name AS category_name
        FROM item 
        JOIN category ON category.id = item.category_id
    `)
    return rows
}

async function getCategoryItems(id) {
    const { rows } = await db.query(`
        SELECT item.name, img_path, price, category.name AS category_name 
        FROM item 
        JOIN category ON category.id = item.category_id
        WHERE category.id = $1
    `, [id])
    return rows
}

async function getCategoryName(id) {
    const { rows } = await db.query(`
        SELECT name FROM category
        WHERE id = $1
    `, [id])
    const category = rows[0].name
    return category
}

module.exports = {
    getAllItems,
    getCategoryItems,
    getCategoryName,
}