const express = require("express");
const productsRouter = express.Router();
const { requiredUser } = require("./utils");
const { getAllProducts } = require("../db");

/*-------api/products/health-------*/
productsRouter.get("/health", async (req, res) => {
	res.send({
		message: "products endpoint is working",
	});
});

// adding reviews api to products

// Middleware function to check if user is an admin
function isAdmin(req, res, next) {
	if (req.user && req.user.admin) {
		// If user exist and is an admin, continue to the next middleware/route handler
		next();
	} else {
		// User is not an admin, so send a 403 Forbidden response
		res.sendStatus(403);
	}
}

//GET api/products
productsRouter.get("/", async (req, res, next) => {
	try {
		const products = await getAllProducts();

		res.send(products);
	} catch (error) {
		next({ error });
	}
});

//GET api/products/:product_id/reviews
productsRouter.get("/:product_id/reviews", async (req, res, next) => {
	const { product_id } = req.params;

	try {
	} catch (error) {
		next(error);
	}
});

//GET api/products/:productid

//POST api/products
// page to add new products-admin only
productsRouter.post("/", isAdmin, async (req, res, next) => {
	const { name, description, price, genre, quantity, image_url } = req.body;

	try {
		// Your code to create a new product
	} catch (error) {
		next(error);
	}
});

//PATCH api/products/:productid
//admin only

//DELTE api/products/:productid
//admin only

module.exports = productsRouter;
