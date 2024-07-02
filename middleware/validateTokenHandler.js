const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler((req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token =authHeader.split(" ")[1];   //0-index=> bearer 1-index=> eyrruqbdfuywqfy7r327
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err)
            {
                res.status(401);
                throw new Error("User is not authorized..!");
            }
            req.user = decode.user;
            next();
        });
        if(!token)
        {
            res.status(401);
            throw new Error("User is not authorized or Token is missing...!");
        }
    }
});

module.exports=validateToken;