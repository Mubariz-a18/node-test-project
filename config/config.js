const dotenv = require('dotenv');
dotenv.config();


const {} = process.env;

const development = {
  dialect: 'postgres', 
  host: 'localhost',   
  port: 5432,        
  username: 'postgres', 
  password: process.env.PASSWORD, 
  database: 'node-test', 
}

module.exports = development;

