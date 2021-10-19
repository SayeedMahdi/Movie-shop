const pool = require("../database");
const express = require("express");
const route = express.Router();



route.post("/search", async (req, res) => {
    const { title } = req.body;
   
    
    pool.query("SELECT * FROM movies WHERE title= ?", ['%'+title+'%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", {result});
       
        });
       

  
});




module.exports = route;

