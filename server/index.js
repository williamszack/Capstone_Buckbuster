const express = require('express')
const PORT = 3001
const app = express()

app.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });