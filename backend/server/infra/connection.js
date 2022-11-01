require("dotenv").config(
  {
    path: "../../.env"
  }
);
const pg = require("pg-promise")();
const bd = pg({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_NAME || 'bd_loja',
});

module.exports = bd;
