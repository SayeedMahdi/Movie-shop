const express=require("express");
const route=express.Router();
const authcontroler=require("../controler/auth");
route.post("/newmovie",authcontroler.newmovie);


module.exports=route;