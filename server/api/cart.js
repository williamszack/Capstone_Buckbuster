const express = require('express');
const cartRouter = express.Router();
const { requiredUser } = require("./utils");
const { getCartItemsByUserId } = require("../db")


/*-------api/cart/health-------*/
cartRouter.get('/health', async (req, res,) => {
    res.send({
        message: "cart endpoint is working"
      });
});


// GET api/cart/:user_id
cartRouter.get('/:user_id', async (req, res, next) => {
  const { user_id } = req.params;
try {
const cartItems = await getCartItemsByUserId(user_id)
res.send(cartItems)
}catch (error) {
  next(error);
}

})
//user must be logged in

//PATCH api/cart/
//user must be logged in

module.exports = cartRouter