require("dotenv").config()
const express = require("express");
const PORT = 3001;
const app = express();
app.use(express.json());

 const apiRouter = require("./api");
 app.use("/api", apiRouter);

const { client } = require('./db/client');

client.connect();

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});