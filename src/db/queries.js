const db = require('./pool')

async function getAllItems() {
    const { rows } = await db.query(`SELECT item.id, category.id, item.name, price, img_path, category.name AS category_name
                                     FROM item 
                                     JOIN category ON category.id = item.category_id`)
    return rows
}

module.exports = {
    getAllItems,
}