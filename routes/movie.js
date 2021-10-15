const db = require("../database");


db.connect((error) => {
    if (error) console.log(error.message);
    else console.log("connected successfuly.");
});


const express = require("express");
const route = express.Router();
route.post("/newmovie", async (req, res) => {
    const { title, genre_id, dailyRate, photo, numberInStock, message, price } = req.body;

    db.query("SELECT * FROM movies WHERE title= ?", [title], (error, result) => {
        if (error) return console.log(error.message);

        else if (result.length > 0) {
            return res.render("index", {
                message: "the title already exist in database"
            })
        }
        db.query("INSERT INTO movies SET ?", { Title: title, genre_id: genre_id, Price: price, DailyRate: dailyRate, NumberInStock: numberInStock, photo: photo, message: message }, (error, result) => {

            if (result) {
                return res.render("index", {
                    message: "the movie added in detabase"
                });
            } else if (error) {
                console.log(error.sqlMessage);
            }
        });


    });
});



// res.send("addded ");



module.exports = route;
