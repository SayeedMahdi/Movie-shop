
const dotenv=require("dotenv");
dotenv.config({path: "./databaseconection.env"});


const { Sequelize } = require('sequelize');
const host=process.env.host;
const user=process.env.Database_user
const password=process.env.Database_password;
const database=process.env.Database_name;


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect:"mysql"
});

  let conection=async ()=>{

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  module.exports=conection;