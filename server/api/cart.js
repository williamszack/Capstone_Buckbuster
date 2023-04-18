const express = require('express');
const cartRouter = express.Router();

/*-------api/cart/health-------*/
cartRouter.get('/health', async (req, res,) => {
    res.send({
        message: "cart endpoint is working"
      });
});

// GET api/cart/
//user must be logged in

//PATCH api/cart/
//user must be logged in

module.exports = cartRouter