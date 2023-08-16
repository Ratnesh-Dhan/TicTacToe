const jwt = require('jsonwebtoken');
require('dotenv').config();

// function for generateAccessToken
const generateAccessToken = (username) => {
    // const payload = JSON.parse(JSON.stringify(username));
   return jwt.sign({data: username}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
 };

 // function for verify token
 const verifyToken = (val) => {
    return jwt.verify(val, process.env.TOKEN_SECRET);
 };

 // validate token
 const validateToken = (req, res, next) => {
   //const access = req.cookie["access_token"];

   const accessToken = req.headers['authorization'].split(" ")[1];
   if(!accessToken) return res.json({error: "user not authenticated"});

   try {
      const validate = verifyToken(accessToken);
      if(validate) {
         req.user = validate;
         res.authenticate = true;
         return next();
      }
   }
   catch(e) {
      console.log(e);
   }
 };

 module.exports = {generateAccessToken, verifyToken, validateToken};