
const express = require('express')
const routes = express.Router();
const pool = require("../database");

//home router for best movie
routes.get("/home", (req, res) => {
    pool.query("SELECT * FROM movies WHERE DailyRate > 2 ", (error, result) => {
        if (error) return console.log(error.message);
        console.log(result);
        res.render("index", { result });
    });
});

//all movies
routes.get("/movie", (req, res) => {
    pool.query("SELECT movies.Title,movies.id,movies.Price,movies.DailyRate,movies.NumberInStock,movies.photo,movies.message,movies.YouTube_link, genres.name AS genre_name FROM movies INNER JOIN genres ON movies.genre_id = genres.id;  ", (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", { result });
    });
});

//search bar option
routes.post("/movie", async (req, res) => {
    const { search } = req.body;
    pool.query("SELECT movies.Title,movies.id,movies.Price,movies.DailyRate,movies.NumberInStock,movies.photo,movies.message,movies.YouTube_link, genres.name AS genre_name FROM movies INNER JOIN genres ON movies.genre_id = genres.id   WHERE Title like ?", ['%' + search + '%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", { result });
    });
});

//genres
routes.get("/genres", (req, res) => {
    res.render("Genres")
});

//Customers all all
routes.get("/customers", (req, res) => {
    pool.query("SELECT customers.name, customers.phone,customers.photo,customers.isGold,movies.name as movie_name FROM ((see INNER JOIN customers ON customer_id=customers.id)  INNER JOIN movies ON movie_id =movies.id  )", (error, row) => {
        if (error) return console.log(error.message);
        res.render("Customer", { row });
    });
});


//adding a new customer
routes.post("/customers", async (req, res) => {
    const { name, phone, isGold, photo } = req.body;
    pool.query("SELECT * FROM customers WHERE phone=?", [phone], (error, result) => {
        if (error) return console.log(error.message);
        else if (result.length > 0) {
            return res.render("Customer", {
                message: "the customer already exist in database"
            })
        };
        pool.query("INSERT INTO customers SET ?", { name: name, phone: phone, isGold: isGold, photo: photo }, (error, result) => {

            if (result) {
                pool.query("SELECT * FROM customers  ", (error, row) => {
                    if (error) return console.log(error.message);
                    message = "addete to database successfully.";
                    res.render("Customer", { row, message });
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
    pool.query("SELECT * FROM customers WHERE name like ?", ['%' + search + '%'], (error, row) => {
        if (error) return console.log(error.message);
        res.render("Customer", { row });

    });
});


//render the form edite
routes.get("/edite/:id", (req, res) => {
    pool.query("SELECT * FROM customers WHERE id=? ", [req.params.id], (error, row) => {
        if (error) return console.log(error.message);
        res.render("edite", { row });
    });
});


//ubdate a customer
routes.post("/edite/:id", (req, res) => {
    const { name, phone, isGold, photo } = req.body;
    pool.query("UPDATE customers SET name=? ,phone=? ,isGold=? ,photo=? WHERE id=? ", [name, phone, isGold, photo, req.params.id], (error, row) => {
        if (error) return console.log(error.message);

        const alert = "success fully edited.";
        pool.query("SELECT * FROM customers  ", (error, row) => {
            if (error) return console.log(error.message);
            allert2 = "Deleted successfully.";
            res.render("Customer", { row, alert });
        });
    });
});

//delete a customer
routes.get("/customer/:id", (req, res) => {
    pool.query("DELETE FROM customers WHERE id =?", [req.params.id], (error, result) => {
        if (error) return console.log(error.message);
        pool.query("SELECT * FROM customers  ", (error, row) => {
            if (error) return console.log(error.message);
            allert2 = "Deleted successfully.";
            res.render("Customer", { row, allert2 });

        });
    });
});

//render the form 
routes.get("/form/:id", (req, res) => {
    pool.query("SELECT id FROM movies WHERE id=? ", [req.params.id], (error, row) => {
        if (error) return console.log(error.message);
        res.render("form", { row });
    });
});

//buy ticket
routes.post("/watch/:id", (req, res) => {
    pool.query("SELECT id FROM movies WHERE id=? ", [req.params.id], (error, row) => {
        if (error) return console.log(error.message);
        
        pool.query("SELECT id FROM customers WHERE phone=? ", [req.body.phone], (error, result) => {
            const message = "your are not registered in database please sign up";
            if (result.length == 0) return res.render("form", { row, message });
            const read1=row[0].id;
            const read2=result[0].id;
            const date= Date();
            let nowDate=date.toString();
            pool.query("INSERT INTO see  SET ?", { customer_id:read2, movie_id:read1,date:date }, function (error, resolve) {
                if (resolve) {
                    res.render("index");
                } else return console.log(error.message);
            });
        });
    });
});
//Genre select all
routes.get("/genre/:id", async (req, res) => {
    
    pool.query("SELECT movies.Title,movies.id,movies.Price,movies.DailyRate,movies.NumberInStock,movies.photo,movies.message,movies.YouTube_link, genres.name AS genre_name FROM movies INNER JOIN genres ON movies.genre_id = genres.id   WHERE genre_id = ?",  req.params.id , (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", { result });
    });
});
module.exports = routes