const express = require("express");
const ordersRouter = express.Router();
const { requiredUser } = require("./utils");
const { createOrder, getOrdersByUserId, getAllOrders } = require("../db");

/*-------api/orders/health-------*/
ordersRouter.get("/health", async (req, res) => {
	res.send({
		message: "orders endpoint is working",
	});
});

//GET /api/orders  admin

ordersRouter.get("/", requiredUser, async (req, res) => {
	const isAdmin = req.user && req.user.admin;

	if (!isAdmin) {
		res.status(403).send({
			error: "403 - UnauthorizedError",
			message: "Action requires administrator credentials",
		});
		console.log("Action requires administrator credentials");
		return;
	}
	try {
		const allOrders = await getAllOrders();
		res.send(allOrders);
	} catch (error) {
		next(error);
	}
});

//GET /api/orders/:userid
ordersRouter.get("/:userId", requiredUser, async (req, res) => {
	const { userId } = req.params;
	try {
		const ordersByUserId = await getOrdersByUserId(userId);
		if (ordersByUserId.length === 0) {
			return res.status(404).send({ message: "No orders found for this user" });
		}
		res.send(ordersByUserId);
	} catch (error) {
		next(error);
	}
});

//POST /api/orders/:userid
ordersRouter.post("/:user_id", async (req, res, next) => {
	const { user_id } = req.params;
	try {
		const order = await createOrder(user_id);
		if (!order) {
			res.status(404).send({ message: "No products in cart" });
		} else {
			res.send({ success: "Order created successfully", order: order });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = ordersRouter;
