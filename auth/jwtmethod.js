const dotenv=require("dotenv");
dotenv.config({path: "./jwt.env"});

const jwt=require("jsonwebtoken");

exports.genretAuth = async function (name, password, email, roleplay) {
  const token = await jwt.sign(
    {
      role_id:roleplay ,
      name: name,
      email: email,
      password: password
    },

    process.env.JWT_KEY,
    {
      expiresIn: "1h"
    }
  );
 
  return token;
};
