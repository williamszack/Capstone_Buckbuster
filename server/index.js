const express = require("express");
const PORT = 3001;
const app = express();
const apiRouter = require("./api");

app.use(express.json());
app.use("/api", apiRouter);
const client = require("./db/client");
client.connect();
app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
