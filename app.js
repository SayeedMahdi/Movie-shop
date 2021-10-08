const express =require("express");
const mysql=require("mysql");
const dotenv=require("dotenv");
const path=require("path");


dotenv.config({path: "./databaseconection.env"});
const app=express();

app.use("./assets",express.static("./assets"));




const db= mysql.createConnection({
    host:process.env.host,
    user:process.env.Database_user,
    password:process.env.Database_password,
    database:process.env.Database_name
});
    
db.connect((error)=>{
    if(error ) console.log(error.message);
    else console.log("connected successfuly.");
})
app.use("/static",express.static(path.join(path.join(__dirname, 'public'))));
app.set("view engine","hbs");


app.get("/api/home",(req,res)=>{
    res.render("index")
});
app.get("/api/movies",(req,res)=>{
    res.render("Movies")
});

app.get("/api/Genres",(req,res)=>{
    res.render("Genres")
});

app.get("/api/customers",(req,res)=>{
    res.render("Customer")
});



const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("listening to port " + port));