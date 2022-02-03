const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
   host: process.env.DB_HOST,
   dialect: 'mysql',
   dialectOptions:{
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
   }
});
const db = sequelize
// Export variable
   // const db = {}
   // db.Sequelize = Sequelize;
   // db.sequelize = sequelize;

// import MODELS 
   const todos = require('./todos')(sequelize, Sequelize)
   const users = require('./users')(sequelize, Sequelize)
   const bugs = require('./bugs')(sequelize, Sequelize)
   const types = require('./types')(sequelize, Sequelize)
   const categories = require('./categories')(sequelize, Sequelize)
   const teams = require('./teams')(sequelize, Sequelize)
// define ASSOCIATIONS
   users.hasMany(todos)
   todos.belongsTo(users)
   teams.hasMany(users)
   users.belongsToMany(teams, { through: 'rosters'})
   todos.hasOne(bugs)
   bugs.belongsTo(todos)
/**
 * INITIALIZE DB
 */   
const initDB = async () => {
   try {
      await sequelize.authenticate()   
      console.log("db connected") 
      sequelize.sync()
   } catch (error) {
      console.log(error)
   }
}
initDB()

exports.User = users