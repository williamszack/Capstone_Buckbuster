// creating separate components for API routing
// index.js will be used to route to appropriate components
// use react router to route to each component
const express = require("express");
const router = express.Router();

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// ROUTER: /api/orders
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

// ROUTER: /api/products
const productsRouter = require("./products");
router.use("/products", productsRouter);

// ROUTER: /api/cart
const cartRouter = require("./cart");
router.use("/cart", cartRouter);

module.exports = router;
