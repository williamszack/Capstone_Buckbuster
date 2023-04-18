require("dotenv").config("../../.env");
const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL);

console.log(process.env.DATABASE_URL);

module.exports = {
    client,
}