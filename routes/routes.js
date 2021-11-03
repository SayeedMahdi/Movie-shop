
const express = require('express')
const routes = express.Router();
const control = require("../router_controler/controlers");
const userControler=require("../userControle/user")
const auth=require("../middleware/auth");


//post a  new movie
routes.post("/home",auth.auth , control.postMovie);

//home router for best movie
routes.get("/home", control.gethome);
//all movies
routes.get("/movie", auth.auth,control.allmovies);

//search bar option
routes.post("/movie", control.search);

//genres
routes.get("/genres", control.getgenre);

//Customers  and movies
routes.get("/getcs&mv", control.movieandcustomer);

//all customers
routes.get("/customers",auth.admine,control.allcustomer);

//adding a new customer
routes.post("/customers", control.addcustomers);

//sarch one customer
routes.post("/onecustomer", control.searchCustomer);

//render the form edite
routes.get("/edite/:id", control.editeCustomers);

//ubdate a customer
routes.post("/edite/:id", control.update);

//delete a customer
routes.get("/customer/:id", control.deleteCustomers);

//render the form for shopping
routes.get("/form/:id", control.form);

//ticket buyer 
routes.post("/watch/:id",auth.auth, control.teckite);

//Genre selection sort all movies by theire genre 
routes.get("/genre/:id", control.sortbygenre);
//register form

//sear movies
routes.post("/movies/search", control.searchMovie);
//login form api
routes.get("/loginform",userControler.logineForm);
//authorization 
routes.post("/auth",userControler.signin);
//sign up form
routes.get("/signupform",userControler.signupform);
//post the new user
routes.post("/signUp",auth.admine,userControler.cheaksignup)
module.exports = routes;
