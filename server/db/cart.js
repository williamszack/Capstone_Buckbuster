const client = require("./index");

async function addToCart({
    user_id,
    product_id,
    quantity,
    price
}) {
    try {
        const { rows: [cartItem] } = await client.query(`
        INSERT INTO cart
        (user_id, product_id, quantity, price)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *;
        `, [user_id, product_id, quantity, price])

        return cartItem
    } catch (error) {
        console.log('error with adding to cart', error)
    }
}

async function getCartItemsByUserId(user_id) {
    try {
        const { rows: cartItems } = await client.query(`
        SELECT cart.quantity, products.name, products.price
        FROM cart
        JOIN products ON cart.product_id = products.product_id
        WHERE cart.user_id = $1;
    `, [user_id])

        return cartItems
    } catch (error) {
        console.log('error getting cart items by userId', error)
    }
}

async function updateCartItem({cart_id, ...fields}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
      if (setString.length === 0) {
        console.log('ERROR setString was 0 get gud')
        return;
      }
    
        try {
          const { rows: [ cartItem ] } = await client.query(`
            UPDATE cart
            SET ${ setString }
            WHERE cart_id=${ cart_id }
            RETURNING *;
          `, Object.values(fields)
          );
          
          return cartItem;
        } catch (error) {
          console.error('error with updating a cart item', error);
        }
}

async function deleteCartItem(cart_id) {
    try {
        const {rows: [cartItem] } = await client.query(`
        DELETE FROM cart
        WHERE cart_id = $1
        RETURNING *;
        `, [cart_id])

        return cartItem
    } catch (error) {
        console.error('error with deleting cart item', error)
    }
}

module.exports = {
	addToCart,
    getCartItemsByUserId,
    updateCartItem,
    deleteCartItem
};