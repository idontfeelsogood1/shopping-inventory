const db = require('./pool')  
const fs = require('fs')
const path = require('path')

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

async function getItemImgPath(id) {
    const { rows } = await db.query(`
        SELECT img_path FROM item
        WHERE id = $1    
    `, [id])
    return rows[0].img_path
}

async function deleteImg(file_path) {
    await fs.unlink(file_path, (err) => {
        if (err) {
            console.log('Error deleting img.', err)
        } else {
            console.log("Deleted img.")
        }
    })
}

async function updateItem(req) {
    const name = req.body.name
    const price = req.body.price
    const item_id = req.params.item_id
    if (!await categoryExisted(req.body.category)) {
        await addCategory(req.body.category)
    }
    const category_id = await getCategoryId(req.body.category)
    
    if (!req.file) {
        await db.query(`
            UPDATE item 
            SET name = $1,
                price = $2,
                category_id = $3
            WHERE id = $4
        `, [name, price, category_id, item_id])
    } else {
        const image_path =  '/item_images/' + req.file.filename
        const prev_img_path = await getItemImgPath(item_id)
        await deleteImg(path.join(__dirname, '..', 'public', prev_img_path))
        await db.query(`
            UPDATE item
            SET name = $1,
                price = $2,
                category_id = $3,
                img_path = $4
            WHERE id = $5     
        `, [name, price, category_id, image_path, item_id])
    }
}

async function removeItem(item_id) {
    // Get item's img_path
    // Delete that img
    // Delete item from db
    const prev_img_path = await getItemImgPath(item_id)
    await deleteImg(path.join(__dirname, '..', 'public', prev_img_path))
    await db.query(`
        DELETE FROM item
        WHERE id = $1
    `, [item_id])
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
    updateItem,
    removeItem,
}
