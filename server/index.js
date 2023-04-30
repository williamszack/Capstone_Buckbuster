require("dotenv").config()
const express = require("express");
const PORT = 3001;
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
 const apiRouter = require("./api");
 app.use("/api", apiRouter);
 
const { client } = require('./db/client');

client.connect();

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});