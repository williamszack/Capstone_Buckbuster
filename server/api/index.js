// creating separate components for API routing
// index.js will be used to route to appropriate components
// use react router to route to each component
 const express = require("express");
 const router = express.Router();

 router.get('/health', async (req, res,) => {
    res.send({
        message: "all is well over here"
      });
});

// ROUTER: /api/users
 const usersRouter = require("./users");
 router.use("/users", usersRouter);

// ROUTER: /api/orders
 const ordersRouter = require("./orders");
 router.use("/orders", ordersRouter);

// // ROUTER: /api/products
 const productsRouter = require("./products");
 router.use("/products", productsRouter);

// // ROUTER: /api/cart
 const cartRouter = require("./cart");
 router.use("/cart", cartRouter);

router.use((req, res,) => {
    res.status(404).send(
        { 
        message: "Please enter a valid endpoint",
        },
    );
  });

 module.exports = router;
