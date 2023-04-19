const express = require('express');
const productsRouter = express.Router();
const { requiredUser } = require("./utils");
const { getAllProducts } = require("../db")

/*-------api/products/health-------*/
productsRouter.get('/health', async (req, res,) => {
    res.send({
        message: "products endpoint is working"
      });
});

// adding reviews api to products

//GET api/products
productsRouter.get('/', async (req, res, next) => {
    try {
    const products = await getAllProducts();

    res.send(
      products
    );
    } catch (error) {
        next({error})
    }
  });

//GET api/products/:productid/reviews

//GET api/products/:productid

//POST api/products
// page to add new products-admin only

//PATCH api/products/:productid
//admin only

//DELTE api/products/:productid
//admin only

module.exports = productsRouter