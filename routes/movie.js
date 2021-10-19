const pool = require("../database");
const url=require("valid-url");
const express = require("express");
const route = express.Router();



route.post("/newmovie", async (req, res) => {
    const { title, genre_id, dailyRate, photo, numberInStock, message, price,video } = req.body;
    const url_va=url.isUri(video, photo);
    if(!url_va) return res.render("index", {
        message: "the uri is not correct."
    })
    
    pool.query("SELECT * FROM movies WHERE title= ?", [title], (error, result) => {
        if (error) return console.log(error.message);

        else if (result.length > 0) {
            return res.render("index", {
                message: "the title already exist in database"
            })
        }
        pool.query("INSERT INTO movies SET ?", { Title: title, genre_id: genre_id, Price: price, DailyRate: dailyRate, NumberInStock: numberInStock, photo: photo, message: message,YouTube_link:video }, (error, result) => {

            if (result) {
                return res.render("index", {
                    message: "the movie added in detabase"
                });
            } else if (error) {
                return res.render("index", {
                    message: error.message
                })
            }
        });


    });
});

route.post("/search", async (req, res) => {
    const { search } = req.body;
   
    
    pool.query("SELECT * FROM movies WHERE Title like ?", ['%'+search+'%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", {result});
       
        });
});


// res.send("addded ");



module.exports = route;
