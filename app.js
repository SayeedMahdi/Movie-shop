const express =require("express");
const app=express();
const pool=require("./database");
const path=require("path");

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());




const pages=require("./routes/routes");

app.use("/movie",require("./routes/movie"));

pool.getConnection((error,connection)=>{
    if(error ) console.log("this is not connected", error.message);
     else  console.log("connected successfuly with id:",connection.threadId);
});



app.set("view engine","hbs");
app.use("/api",pages);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("listening to port " + port));