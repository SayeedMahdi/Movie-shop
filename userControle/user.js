const pool = require("../database");
const bcrypt = require("bcrypt");
const jwtmethod = require("../auth/jwtmethod");

//call the form for login
exports.logineForm = (req, res) => {
  res.render("login");
};
//call the
exports.signupform = (req, res) => {
  res.render("signUp");
};

exports.cheaksignup = (req, res) => {
  let { name, password, email, roleplay } = req.body;
  pool.query( "SELECT * FROM users WHERE email= ?",email,async (err, result) => {
      if (err) return console.log(err.message);
      else if (result.length > 0) return res.render("login", { message: "User already exist!" });
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
        try{
       const token = await jwtmethod.genretAuth(name, password, email, roleplay );
     
          res.cookie("token",token,{
           
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });
        }catch(err) {return res.send(err)}
      pool.query( "INSERT INTO users SET ?",{ fulname: name, password: password, email: email, role_id: roleplay },  (err, result2) => {

          if (err) return console.log(err.message);
          res.redirect("/api/home");
        }
      );
    }
  );
};

exports.signin = async (req, res) => {
  let { email, password, roleplay } = req.body;

  pool.query("SELECT * FROM users WHERE email= ? AND role_id= ? ", [email,roleplay],async (err, result) => {
    console.log(result);
      if (err) return console.log(err.message);
      else if (result.length <= 0){
        return res.render("login", { message: "The user is undefined!" });
      }
      
      const re_pass = result[0].password;
      const role_id = result[0].role_id; 
      const db_name= result[0].fulname;
      const db_email = result[0].email;
      


      const validatePassword = await bcrypt.compare( password,re_pass);
  
      if (validatePassword) {
        const token = await jwtmethod.genretAuth(db_name, validatePassword, db_email, role_id );
       
        res.cookie("token",token,{
     
          httpOnly: true, // http only, prevents JavaScript cookie access
          secure: true // cookie must be sent over https / ssl
      });
      
        res.redirect("/api/movie");
      }else{
      return res.render("login", { message: "The password or email is wrong" });
    }
}
  );
};
