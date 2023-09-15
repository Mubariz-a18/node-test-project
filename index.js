// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./Db/index.js');
const UserRouter = require('./routes/userRoutes.js')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(UserRouter);
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
