// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Db/index');

const Users = sequelize.define('Users', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_image: {
    type: DataTypes.STRING,
  },
  total_orders: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE
  },
  last_logged_in: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false
});

module.exports = Users;
