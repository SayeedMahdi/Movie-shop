const express =require("express");
const app=express();
const db=require("./database");
const path=require("path");

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


console.log("did true");

const pages=require("./routes/routes");

app.use("/movie",require("./routes/movie"));

db.connect((error)=>{
    if(error ) console.log(error.message);
    else console.log("connected successfuly.");
});



app.set("view engine","hbs");
app.use("/api",pages);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("listening to port " + port));