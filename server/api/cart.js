const express = require('express');
const cartRouter = express.Router();
const { requiredUser } = require("./utils");
const { getCartItemsByUserId, deleteCartItem, addToCart } = require("../db");



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


//DELETE api/cart/:user_id/:product_id
cartRouter.delete('/:user_id/:product_id', async (req, res, next) => {
  const { user_id , product_id } = req.params;
try {

const DeleteItem = await deleteCartItem(user_id, product_id)
res.send(DeleteItem)

}catch (error) {
  next(error);
}

})

//user must be logged in
//POST api/cart

cartRouter.post('/', async (req, res, next) => {
  const { user_id , product_id } =req.body;
  try {
    const newItem = await addToCart({user_id, product_id})
    res.send(newItem)

  }catch (error){
    next(error);
  }
})

module.exports = cartRouter