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

async function addCategory(category) {
    await db.query(`
        INSERT INTO category (name)
        VALUES ($1)
    `, [category])
}

async function getCategoryId(category_name) {
    const { rows } = await db.query(`
        SELECT id FROM category
        WHERE name = $1
    `, [category_name])
    const id = rows[0].id 
    return id
}

async function addItem(item) {
    await db.query(`
        INSERT INTO item (name, img_path, price, category_id)
        VALUES ($1, $2, $3, $4)
    `, [item.name, item.img_path, item.price, item.category_id])
}

async function categoryExisted(category) {
    const { rows } = await db.query(`
        SELECT name FROM category
        WHERE name = $1
    `, [category])

    if (rows.length > 0) return true
    else return false
}

async function getItem(id) {
    const { rows } = await db.query(`
        SELECT item.id AS item_id, category.id AS category_id, item.name, price, img_path, category.name AS category_name
        FROM item 
        JOIN category ON category.id = item.category_id
        WHERE item.id = $1
    `, [id])
    return rows[0]
}

module.exports = {
    getAllItems,
    getCategoryItems,
    getCategoryName,
    addCategory,
    getCategoryId,
    addItem,
    categoryExisted,
    getItem,
}
