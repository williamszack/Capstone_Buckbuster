const client = require("./index");

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

async function getOrdersByUserId(userId) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        SELECT *
        FROM orders
        WHERE user_id = $1;
            `,
			[userId]
		);
		if (!order) {
			console.log(`${userId} does not exist`);
			return null;
		}

		return order;
	} catch (error) {
		console.error("Error retreiving orders by userId:", error);
	}
}

async function getOrdersByProductId(productId) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        SELECT *
        FROM orders
        WHERE product_id = $1
            `,
			[productId]
		);
		if (!order) {
			console.log(`${productId} does not exist`);
			return null;
		}

		return order;
	} catch (error) {
		console.error("Error retreiving orders by productId:", error);
	}
}

async function deleteOrder(id) {
	try {
        const { rows: [order], } =  await client.query(
			`
        DELETE FROM orders
        WHERE order_id = $1
        RETURNING *;
        `,
			[id]
		);

		return order;
	} catch (error) {
		console.error("Error deleting order Id:", error);
	}
}

async function createOrder(user_id, product_id, quantity, shipping_address, billing_address) {
    try {
        const { rows: [order] } = await client.query(
            `
        INSERT INTO orders (user_id, product_id, quantity, shipping_address, billing_address)
            `,
            
            )
    } catch (error)
}



async function orderDetails() {

}

module.export = {
	getAllOrders,
	getOrdersByUserId,
	getOrdersByProductId,
	deleteOrder,

};
