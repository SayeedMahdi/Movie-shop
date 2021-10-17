
const dotenv=require("dotenv");
dotenv.config({path: "./databaseconection.env"});

const mysql=require("mysql");

const pool=mysql.createPool ({
    host:process.env.host,
    user:process.env.Database_user,
    password:process.env.Database_password,
    database:process.env.Database_name
});
module.exports=pool;