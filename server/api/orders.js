const express = require('express');
const ordersRouter = express.Router();
const { requiredUser } = require("./utils");
const { createOrder, getOrdersByUserId, getAllOrders } = require('../db');

/*-------api/orders/health-------*/
ordersRouter.get('/health', async (req, res,) => {
    res.send({
        message: "orders endpoint is working"
      });
});


//GET /api/orders
//admin

ordersRouter.get('/', async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    res.send(allOrders);
  } catch (error) {
    console.error(error);
  }
})

//GET /api/orders/:userid

ordersRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const ordersByUserId = await getOrdersByUserId(userId);
    if (!ordersByUserId) {
      return res.status(404).send({ message: 'Orders not found'});
    }
    res.send(ordersByUserId);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error'});
  }
})

//POST /api/orders/:userid

ordersRouter.post('/:user_id', async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const order = await createOrder(user_id);
    if (!order) {
      res.status(404).send({ message: 'No products in cart'})
    }
    res.send(order);
  } catch (error) {
    next (error);
  }
})


module.exports = ordersRouter
