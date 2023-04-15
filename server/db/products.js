const client = require("./index");

//products database functions

async function getAllProducts() {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products;
        `);

        return products
    } catch (error) {
        console.error('error with getting all products')
    }
}

async function addNewProduct({
    name, 
    description,
    price, 
    genre, 
    quantity, 
    image_url}) {
    try {
        const {rows: [ product ]} = await client.query(`
        INSERT INTO products
        (name, description, price, genre, quantity, image_url)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `, [name, description, price, genre, quantity, image_url])

    return product
    } catch (error) {
        console.error('error with adding new product')
    }
}

async function updateProduct({product_id, ...fields}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
      if (setString.length === 0) {
        return;
      }
    
        try {
          const { rows: [ product ] } = await client.query(`
            UPDATE products
            SET ${ setString }
            WHERE product_id=${ product_id }
            RETURNING *;
          `, Object.values(fields)
          );
          
          return product;
        } catch (error) {
          console.error('error with updating a product');
        }
}

async function getProductById(product_id) {
    try {
        const {rows: [ product ]} = await client.query(`
        SELECT *
        FROM products
        WHERE product_id=$1
        `, [product_id])

    return product
    } catch (error) {
        console.error('error with getting product by id')
    }
}

async function getProductByname(name) {
    try {
        const {rows: [ product ]} = await client.query(`
        SELECT *
        FROM products
        WHERE name=$1
        `, [name])

    return product
    } catch (error) {
        console.error('error with getting product by name')
    }
}

async function getAllProductsByGenre(genre) {
    try {
        const {rows: products } = await client.query(`
        SELECT *
        FROM products
        WHERE genre = $1
        `, [genre])

    return products
    } catch (error) {
        console.error('error with getting all products by genre')
    }
}

async function deleteProduct(product_id) {
    try {
        const {rows: product } = await client.query(`
        DELETE FROM products
        FROM product_id = $1
        RETURNING *
        `, [product_id])

    return product
    } catch (error) {
        console.error('error with deleting product')
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByname,
    getAllProductsByGenre,
    addNewProduct,
    deleteProduct,
    updateProduct
}