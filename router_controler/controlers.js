const url = require("valid-url");
const pool = require("../database");

//home page
exports.gethome = (req, res) => {
    pool.query("SELECT * FROM movies WHERE DailyRate > 8 ", (error, result) => {
        if (error) return console.log(error.message);
       
        res.render("index", { result });
    });
};
//post a movie to database
exports.postMovie = async (req, res) => {
    const { title, genre_id, dailyRate, photo, numberInStock, message, price, video } = req.body;
    const url_va = url.isUri(video, photo);
    if (!url_va) return res.render("index", {
        message: "the uri is not correct."
    });
    pool.query("SELECT * FROM movies WHERE title= ?", [title], (error, result) => {
        if (error) return console.log(error.message);
        else if (result.length > 0) {
            return res.render("index", {
                message: "the title already exist in database"
            })
        };
        pool.query("INSERT INTO movies SET ?", { Title: title, genre_id: genre_id, Price: price, DailyRate: dailyRate, NumberInStock: numberInStock, photo: photo, message: message, YouTube_link: video }, (error, result) => {
            if (result) {
                res.render("/api/home" ,{message:"the movied added to database"})
            } else if (error) {
                return res.render("index", {
                    message: error.message
                })
            }
        });
    });
}

//all movies
exports.allmovies = (req, res) => {
    pool.query("SELECT movies.Title,movies.id,movies.Price,movies.DailyRate,movies.NumberInStock,movies.photo,movies.message,movies.YouTube_link, genres.name AS genre_name FROM movies INNER JOIN genres ON movies.genre_id = genres.id;  ", (error, result) => {
        if (error) return console.log(error.message);
        res.render("Movies", { result });
    });
};
//search options
exports.search = async (req, res) => {
    const { search } = req.body;
    pool.query("SELECT movies.Title,movies.id,movies.Price,movies.DailyRate,movies.NumberInStock,movies.photo,movies.message,movies.YouTube_link, genres.name AS genre_name FROM movies INNER JOIN genres ON movies.genre_id = genres.id   WHERE Title like ?", ['%' + search + '%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("Movies", { result });
    });
}
//all genres
exports.getgenre = (req, res) => {
    res.render("Genres")
}
//all customers and movies
exports.movieandcustomer = (req, res) => {
    pool.query("SELECT customers.name, customers.phone,customers.photo,customers.isGold,movies.title as movie_name FROM ((see INNER JOIN customers ON customer_id=customers.id)  INNER JOIN movies ON see.movie_id =movies.id  )", (error, row) => {
        if (error) return console.log(error.message);
        res.render("customer and movie", { row });
    });
}
//all customers
exports.allcustomer = (req, res) => {
     const limit=req.query.limit;
    const page=req.query.page;
    const start_index=(page-1)*limit;
    const ende_index=page*limit;
    pool.query("SELECT COUNT(id) FROM customers ", (error, pages) => {
        if (error) return console.log(error.message);
        res.render("Customer", { pages });
    });

    pool.query("SELECT * FROM customers ", (error, row) => {
        if (error) return console.log(error.message);
        res.render("Customer", { row });
    });
}

//add customers
exports.addcustomers = async (req, res) => {
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
}
//Search customers
exports.searchCustomer = async (req, res) => {
    const { search } = req.body;
    pool.query("SELECT * FROM customers WHERE name like ?", ['%' + search + '%'], (error, row) => {
        if (error) return console.log(error.message);
        res.render("Customer", { row });

    });
}
//Edite form of loader
exports.editeCustomers = (req, res) => {
    pool.query("SELECT * FROM customers WHERE id=? ", [req.params.id], (error, row) => {
        if (error) return console.log(error.message);
        res.render("edite", { row });
    });
}
//update a customer
exports.update = (req, res) => {
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
}
//delete a customers
exports.deleteCustomers = (req, res) => {
    pool.query("DELETE FROM customers WHERE id =?", [req.params.id], (error, result) => {
        if (error) return console.log(error.message);
        pool.query("SELECT * FROM customers  ", (error, row) => {
            if (error) return console.log(error.message);
            allert2 = "Deleted successfully.";
            res.render("Customer", { row, allert2 });
        });
    });
}
//for for shopping movie
exports.form = (req, res) => {
    pool.query("SELECT id FROM movies WHERE id=? ", [req.params.id], (error, row) => {
        if (error) return console.log(error.message);
        res.render("form", { row });
    });
}
//tickete buyer
exports.teckite = (req, res) => {
    pool.query("SELECT id FROM movies WHERE id=? ", [req.params.id], (error, row) => {
        if (error) return console.log(error.message);

        pool.query("SELECT id FROM customers WHERE phone=? ", [req.body.phone], (error, result) => {
            const message = "your are not registered in database please sign up";
            if (result.length == 0) return res.render("form", { row, message });
            const read1 = row[0].id;
            const read2 = result[0].id;
            const date = Date();
            let nowDate = date.toString();
            pool.query("INSERT INTO see  SET ?", { customer_id: read2, movie_id: read1, date: date }, function (error, resolve) {
                if (resolve) {

                } else return console.log(error.message);
            });
        });
    });
}

//sort by genre
exports.sortbygenre = async (req, res) => {
    pool.query("SELECT movies.Title,movies.id,movies.Price,movies.DailyRate,movies.NumberInStock,movies.photo,movies.message,movies.YouTube_link, genres.name AS genre_name FROM movies INNER JOIN genres ON movies.genre_id = genres.id   WHERE genre_id = ?", req.params.id, (error, result) => {
        if (error) return console.log(error.message);
        res.render("movies", { result });
    });
}

//movie search
exports.searchMovie = async (req, res) => {
    const { search } = req.body;
    pool.query("SELECT * FROM movies WHERE Title like ?", ['%'+search+'%'], (error, result) => {
        if (error) return console.log(error.message);
        res.render("Movie", {result});
       
        });
}
