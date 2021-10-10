 const express = require('express')
const routes=express.Router();


routes.get("/home",(req,res)=>{
    
    res.render("index.hbs")
});
routes.get("/movies",(req,res)=>{
    res.render("Movies")
});

routes.get("/genres",(req,res)=>{
    res.render("Genres")
});

routes.get("/customers",(req,res)=>{
    res.render("Customer")
});
 

module.exports=routes;