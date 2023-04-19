const express = require('express');
const ordersRouter = express.Router();
const { requiredUser } = require("./utils");

/*-------api/orders/health-------*/
ordersRouter.get('/health', async (req, res,) => {
    res.send({
        message: "orders endpoint is working"
      });
});


//GET /api/orders
//admin

//GET /api/orders/:userid

//POST /api/orders/:userid

module.exports = ordersRouter
