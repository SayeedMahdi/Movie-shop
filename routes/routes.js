
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

routes.post("/customers", async (req, res) => {
    const { name,phone, isGold, photo } = req.body;
   
    pool.query("SELECT * FROM customers WHERE phone= ?", [phone], (error, result) => {
        if (error) return console.log(error.message);

        else if (result.length > 0) {
            return res.render("Customer", {
                message: "the customer already exist in database"
            })
        };
        pool.query("INSERT INTO customers SET ?", { name: name, phone: phone, isGold: isGold, photo: photo }, (error, result) => {

            if (result) {
                return res.render("Customer", {
                    message: "the customer added in detabase"
                });
            } else if (error) {
                return res.render("Customer", {
                    message: error.message
                })
            }
        });
    });
});


routes.get("/customers",(req,res)=>{
    res.render("Customer")
});
 

module.exports=routes