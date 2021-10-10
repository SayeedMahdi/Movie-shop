const express =require("express");
const mysql=require("mysql");
const dotenv=require("dotenv");
const path=require("path");
const pages=require("./routes/routes");

dotenv.config({path: "./databaseconection.env"});
const app=express();

app.use("/auth",require("./routes/auth"));



const db= mysql.createConnection({
    host:process.env.host,
    user:process.env.Database_user,
    password:process.env.Database_password,
    database:process.env.Database_name
});

db.connect((error)=>{
    if(error ) console.log(error.message);
    else console.log("connected successfuly.");
});


app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set("view engine","hbs");
app.use("/api",pages);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("listening to port " + port));