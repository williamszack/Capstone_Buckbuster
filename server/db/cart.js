const { client } = require("./client");

async function addToCart({
    user_id,
    product_id
}) {
    try {
        const { rows: [existingCartItem] } = await client.query(`
        SELECT *
        FROM cart
        WHERE user_id = $1 AND product_id = $2
        `, [user_id, product_id])

        if (existingCartItem) {
            return { error: "Item already exists in cart" }
        } else {
           const {rows: [newItem]} = await client.query(`
            INSERT INTO cart (user_id, product_id)
            VALUES ($1, $2)
            RETURNING *;
            `, [user_id, product_id])
            
            return newItem
        }
    } catch (error) {
        console.log('error with adding to cart', error)
    }
} 
 
async function getCartItemsByUserId(user_id) {
    try {
        const { rows: cartItems } = await client.query(`
        SELECT products.name, products.price, products.product_id
        FROM cart
        JOIN products ON cart.product_id = products.product_id
        WHERE cart.user_id = $1;
    `, [user_id])

        return cartItems
    } catch (error) {
        console.log('error getting cart items by userId', error)
    }
}

async function deleteCartItem(user_id, product_id) {
    try {
        const {rows: [cartItem] } = await client.query(`
        DELETE FROM cart
        WHERE product_id = $2 AND user_id = $1
        RETURNING *;
        `, [user_id, product_id])

        return cartItem
    } catch (error) {
        console.error('error with deleting cart item', error)
    }
}

module.exports = {
	addToCart,
    getCartItemsByUserId,
    deleteCartItem
};