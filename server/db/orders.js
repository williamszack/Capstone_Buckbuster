const { client } = require("./client");

// orders database functions

async function getAllOrders() {
	try {
		const { rows } = await client.query(
			`
        SELECT *
        FROM orders;
            `
		);

		return rows;
	} catch (error) {
		console.error("Error retreiving all orders:", error);
	}
}

async function getOrdersByUserId(user_id) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        SELECT *
        FROM orders
        WHERE user_id = $1;
            `,
			[user_id]
		);
		if (!order) {
			console.log(`${user_id} does not exist`);
			return null;
		}

		return order;
	} catch (error) {
		console.error("Error retreiving orders by userId:", error);
	}
}

async function getOrdersByProductId(product_id) {
	try {
		const { rows } = await client.query(
			`
        SELECT *
        FROM orders
        WHERE product_id = $1;
            `,
			[product_id]
		);
		if (!rows) {
			console.log(`${product_id} does not exist`);
			return null;
		}

		return rows;
	} catch (error) {
		console.error("Error retreiving orders by productId:", error);
	}
}

async function cancelOrder(order_id) {
	try {
		await client.query("BEGIN");
		// Get the order details
		const {
			rows: [order],
		} = await client.query(
			`
          SELECT *
          FROM orders
          WHERE order_id = $1
          FOR UPDATE;
        `,
			[order_id]
		);
		// Update the product quantity(return back to inventory) by adding qty from order
		await client.query(
			`
          UPDATE products
          SET quantity = quantity + $1
          WHERE product_id = $2;
        `,
			[order.quantity, order.product_id]
		);
		// Delete the order
		await client.query(
			`
          DELETE FROM orders WHERE order_id = $1;
        `,
			[order_id]
		);
		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");
		console.error("Error canceling order:", error);
	}
}

async function createOrder(user_id, product_id, quantity, shipping_address, billing_address) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        INSERT INTO orders (user_id, product_id, quantity, shipping_address, billing_address)
        SELECT $1, $2, $3, $4, $5
        FROM cart
        WHERE user_id = $1
        RETURNING *;
            `,
			[user_id, product_id, quantity, shipping_address, billing_address]
		);

		return order;
	} catch (error) {
		console.error("Error creating order:", error);
	}
}

module.exports = {
	getAllOrders,
	getOrdersByUserId,
	getOrdersByProductId,
	cancelOrder,
	createOrder,
};

// async function deleteOrder(id) {
// 	try {

//         //sql query to insert back product qty into products

//         const { rows: [order], } =  await client.query(
// 			`
//         DELETE FROM orders
//         WHERE order_id = $1
//         RETURNING *;
//         `,
// 			[id]
// 		);

// 		return order;
// 	} catch (error) {
// 		console.error("Error deleting order Id:", error);
// 	}
// }
