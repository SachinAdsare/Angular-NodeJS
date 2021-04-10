const dbConfig = require("../config/db.config.js");

// Include Sequelize module
const Sequelize = require('sequelize')
  
// Creating new Object of Sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
  
        // Explicitly specifying 
        // mysql database
        dialect: dbConfig.dialect,
  
        // By default host is 'localhost'           
        host: dbConfig.HOST,
        pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle
        }
    }
);
  
// Exporting the sequelize object. 
// We can use it in another file
// for creating models
module.exports = sequelize;