const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./jwt.env" });
     

exports.auth = async (req, res, next) => {
   
  const token=req.cookies.token;
  console.log(token);
  if (!token){
    return res.status(401).render("index",{message2:"access denided for un authorized users"})
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    console.log(decode);
    req.decode;
    next();
  } catch (ex) {
    return res.status(400).send("INAVLID TOKEN");
  }
};
exports.admine = async (req, res, next) => {
   
  const token=req.cookies.token;
  console.log(token);
  if (!token){
    return res.status(401).render("/api/home",{message2:"access denided for un authorized users"})
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if(decode.role_id==1){
    req.decode;
    next();
    }else{
      return res.status(401).render("index",{message2:"access denided for users it is for admine level"})
    }
  } catch (ex) {
    return res.status(400).send("INAVLID TOKEN");
  }
};

