const express = require("express");
const productsRouter = express.Router();
const { requiredUser } = require("./utils");
const {
	addNewProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	getProductByname,
	getReviewsByProductId,
	updateProduct,
} = require("../db");

/*-------api/products/health-------*/
productsRouter.get("/health", async (req, res) => {
	res.send({
		message: "Products endpoint is working",
	});
});

// adding reviews api to products

//GET api/products
productsRouter.get("/", async (req, res, next) => {
	try {
		const movies = await getAllProducts();

		console.log("GET/allproducts", movies);
		res.send(movies);
	} catch (error) {
		const customError = new Error("Failed to fetch products");
		customError.status = 500;
		customError.cause = error;
		next(customError);
	}
});

//GET api/products/:productid
productsRouter.get("/:product_id", async (req, res, next) => {
	const { product_id } = req.params;

	try {
		const movie = await getProductById(product_id);
		if (!movie) {
			res.status(404).send({
				error: "404 - ProductDoesNotExist",
				message: `Product ID: ${product_id} does not exist`,
			});
		} else {
			console.log("GET/:product_id", movie);
			res.send(movie);
		}
	} catch (error) {
		next(error);
	}
});

//GET api/products/:product_id/reviews
productsRouter.get("/:product_id/reviews", async (req, res, next) => {
	const { product_id } = req.params;

	const movie = await getProductById(product_id);
	if (!movie) {
		res.status(404).send({
			error: "404 - ProductDoesNotExist",
			message: `Product ID: ${product_id} does not exist`,
		});
	}
	try {
		const reviewByMovieId = await getReviewsByProductId(product_id);

		console.log("GET/:product_id/reviews", reviewByMovieId);
		res.send(reviewByMovieId);
	} catch (error) {
		next(error);
	}
});

//POST api/products
// page to add new products-admin only
productsRouter.post("/", requiredUser, async (req, res, next) => {
	const isAdmin = req.user && req.user.admin;
	const { name, description, price, genre, quantity, image_url } = req.body;

	const movie = await getProductByname(name);
	if (!isAdmin) {
		res.status(403).send({
			error: "403 - UnauthorizedError",
			message: "Action requires administrator credentials to add products",
		});
	} else if (
		movie.name === name &&
		movie.description === description &&
		movie.price === price &&
		movie.genre === genre &&
		movie.quantity === quantity &&
		movie.image_url === image_url
	) {
		res.status(400).send({
			error: "400 - DuplicateError",
			message: "Duplicate product already exist",
		});
	}
	try {
		const addProduct = await addNewProduct({
			name,
			description,
			price,
			genre,
			quantity,
			image_url,
		});

		console.log("POST/addnewproduct", addProduct);
		res.send(addProduct);
	} catch (error) {
		next(error);
	}
});

//PATCH api/products/:productid
//admin only
productsRouter.patch("/:product_id", requiredUser, async (req, res, next) => {
	const isAdmin = req.user && req.user.admin;
	const { product_id } = req.params;
	const { name, description, price, genre, quantity, image_url } = req.body;

	const movie = await getProductById(product_id);
	if (!isAdmin) {
		res.status(403).send({
			error: "403 - UnauthorizedError",
			message: "Action requires administrator credentials to update product attributes",
		});
	} else if (!movie) {
		res.status(404).send({
			error: "404 - ProductDoesNotExist",
			message: `Product ID: ${product_id} does not exist`,
		});
	} else if (
		movie.name === name &&
		movie.description === description &&
		movie.price === price &&
		movie.genre === genre &&
		movie.quantity === quantity &&
		movie.image_url === image_url
	) {
		res.status(400).send({
			error: "400 - DuplicateError",
			message: "Duplicate product attributes already exist",
		});
	} else if (Object.keys(req.body).length === 0) {
		res.status(400).send({
			error: "400 - UpdatesdRequiredError",
			message: "Field(s) must be updated to process change",
		});
	}
	try {
		const updateMovie = await updateProduct({
			name,
			description,
			price,
			genre,
			quantity,
			image_url,
		});

		console.log("UPDATE/:product_id", updateMovie);
		res.send(updateMovie);
	} catch (error) {
		next(error);
	}
});

//DELTE api/products/:productid
//admin only
productsRouter.delete("/:product_id", requiredUser, async (req, res, next) => {
	const isAdmin = req.user && req.user.admin;
	const { product_id } = req.params;

	const movie = await getProductById(product_id);
	if (!isAdmin) {
		res.status(403).send({
			error: "403 - UnauthorizedError",
			message: "Action requires administrator credentials to delete product",
		});
	} else if (!movie) {
		res.status(404).send({
			error: "404 - ProductDoesNotExist",
			message: `Product ID: ${product_id} does not exist`,
		});
	}
	try {
		const destroy = await deleteProduct(product_id);

		console.log("DELETE/:product_id", destroy);
		res.send(destroy);
	} catch (error) {
		next(error);
	}
});

module.exports = productsRouter;
