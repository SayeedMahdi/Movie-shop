
const express = require('express')
const routes=express.Router();
const pool = require("../database");

routes.get("/home",(req,res)=>{
    pool.query("SELECT * FROM movies WHERE DailyRate > 2 ", (error, result) => {
        if (error) return console.log(error.message);
        console.log(result);
        
        res.render("index", {result});

    });
    
});
routes.get("/movie",(req,res)=>{
   
    pool.query("SELECT * FROM movies  ", (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", {result});

    });
  
   
});
routes.post("/movie", async (req, res) => {
    const { search } = req.body;
   
    
    pool.query("SELECT * FROM movies WHERE Title like ?", ['%'+search+'%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", {result});
       
        });
});



routes.get("/genres",(req,res)=>{
    res.render("Genres")
});

routes.get("/customers",(req,res)=>{
    res.render("Customer")
});
 

module.exports=routes;