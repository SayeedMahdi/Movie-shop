
const express = require('express')
const routes=express.Router();
const pool = require("../database");

//home router for best movie
routes.get("/home",(req,res)=>{
    pool.query("SELECT * FROM movies WHERE DailyRate > 2 ", (error, result) => {
        if (error) return console.log(error.message);
        console.log(result);
        
        res.render("index", {result});

    });
    
});
//all movies
routes.get("/movie",(req,res)=>{
   
    pool.query("SELECT * FROM movies  ", (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", {result});

    });
});

//search bar option
routes.post("/movie", async (req, res) => {
    const { search } = req.body;

    pool.query("SELECT * FROM movies WHERE Title like ?", ['%'+search+'%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", {result});
       
        });
});

//genres
routes.get("/genres",(req,res)=>{
    res.render("Genres")
});
//adding a new customer
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
//sarch one customer
routes.post("/onecustomer", async (req, res) => {
    const { search } = req.body;

    pool.query("SELECT * FROM customers WHERE name like ?", ['%'+search+'%'], (error, row) => {
        if (error) return console.log(error.message);
        res.render("Customer", {row});
       
        });
});

//Customers all photo
routes.get("/customers",(req,res)=>{
   
    pool.query("SELECT * FROM customers  ", (error, row) => {
        if (error) return console.log(error.message);
        console.log(row);
        res.render("Customer", {row});

    });
  
   
});
routes.get("/edite",(req,res)=>{
    res.render("edite");
})

module.exports=routes