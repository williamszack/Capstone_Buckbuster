const express = require('express');
const ordersRouter = express.Router();
const { requiredUser } = require("./utils");
const {createOrder, getOrdersByUserId, getAllOrders } = require("../db")
/*-------api/orders/health-------*/
ordersRouter.get('/health', async (req, res,) => {
    res.send({
        message: "orders endpoint is working"
      });
});


//GET /api/orders
ordersRouter.get('/', async (req, res, next) => {
const orders = await getAllOrders()
res.send(orders)
})
//admin

//GET /api/orders/:userid
ordersRouter.get('/:user_id', async (req, res, next) => {
  const { user_id } = req.params;
try {
const orderItems = await getOrdersByUserId(user_id)
res.send(orderItems)
}catch (error) {
  next(error);
}
})


//POST /api/orders/:userid
ordersRouter.post('/:user_id', async (req, res, next) => {
  const { user_id } = req.params; 
  try {
    const order = await createOrder(user_id);
    res.send( order );
  } catch (error) {
    next(error);
  }
})

module.exports = ordersRouter

