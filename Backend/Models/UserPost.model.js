// Include Sequelize module.
const Sequelize = require('sequelize')
  
// Import sequelize object, 
// Database connection pool managed by Sequelize.
const sequelize = require('./index')
const user = require('./User.model')


const userPost= sequelize.define('UserPost', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        postTitle: Sequelize.TEXT,
        userid: {
          type: Sequelize.INTEGER
         
      }
    })

    user.hasMany(userPost,
      { // Options:
          foreignKey: 'userid'
      });
  
// userPost.belongsTo(user, {
//   as: 'id',
//   foreignKey: {
//       name: 'User_id',
//       allowNull: false
//   }
// });

  
module.exports=userPost