const url = require("valid-url");
const pool = require("../database");
const bcrypt = require('bcrypt');


//call the form for login
exports.logineForm = (req, res) => {
    res.render("login")
}
//call the 
exports.signupform=(req, res) => {
    res.render("signUp")
}

exports.cheaksignup = (req, res) => {
    let { name, password, email } = req.body;
    pool.query("SELECT * FROM users WHERE email= ?", email, async (err, result) => {
        if (err) return console.log(err.message);
        else if (result.length > 0) return res.render("login", { message: "User already exist!" });
        const salt =  await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        pool.query("INSERT INTO users SET ?", { name: name, password: password, email: email }, (err, result) => {
            if (err) return console.log(err.message);
            res.redirect("/api/home");
        });
    });
        
}



exports.signin = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    let { email, password } = req.body;


    pool.query("SELECT * FROM users WHERE email= ? ", email, (err, result) => {

        if (err) return res.render("login", { message: err.message });
        
        // else if (result.length <= 0) return res.render("login", { message: "The name or password is not defined" });
        const re_pass = result.password;
        res.render("Movies");

        // const validatePassword =  bcrypt.compare(re_pass,password);
        // console.log(validatePassword);
        // if(validatePassword) 
        //  return res.render("login",{message:"The password or name is wrong"})
    });

}