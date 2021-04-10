
// Include Sequelize module.
const Sequelize = require('sequelize')
  
// Import sequelize object, 
// Database connection pool managed by Sequelize.
const sequelize = require('../Models/index')

const user= sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: Sequelize.STRING,
  role: {
    type:Sequelize.ENUM,
    values:['Admin', 'User']
  },
  email: {
    type: Sequelize.STRING,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
})

module.exports = user