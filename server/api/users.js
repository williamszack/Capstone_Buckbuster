const express = require('express');
const ordersRouter = require('./orders');
const usersRouter = express.Router();

/*-------api/users/health-------*/
usersRouter.get('/health', async (req, res,) => {
    res.send({
        message: "users endpoint is working"
      });
});


//GET api/users

//POST api/users/register

//POST api/users/login

//GET api/users/me

//POST api/users/admin
// admin view page to conduct certain functionality

module.exports = usersRouter