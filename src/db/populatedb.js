const { Client } = require('pg')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../connection.env') });

const sql = `
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL 
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img_path VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    category_id INT REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO category (name) VALUES
('Electronics'),
('Clothing'),
('Books'),
('Home Appliances'),
('Sports');

INSERT INTO item (name, img_path, price, category_id) VALUES
('Wireless Headphones', '../public/item_images/item_1.jpg', 99.99, 1), 
('Running Shoes', '../public/item_images/item_2.jpg', 79.50, 2),      
('Novel - The Great Gatsby', '../public/item_images/item_3.jpg', 15.20, 3), 
('Blender', '../public/item_images/item_4.jpg', 45.00, 4),            
('Football', '../public/item_images/item_5.jpg', 25.00, 5);           
`

const client = new Client({
    connectionString: process.env.URL,
})

async function main() {
    console.log("Populating...")
    await client.connect()
    await client.query(sql)
    await client.end()
    console.log("Database populated.")
}

main()

// item
    // id
    // name
    // img_path
    // price
    // category_id
    // brand_id

// category
    // id
    // name

// SELECT item.name, category.name FROM item
// JOIN category ON item.category_id = category.id;
