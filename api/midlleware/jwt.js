import  jwt  from "jsonwebtoken";
import { createError } from "../ultils/error.js";

export const verifyToken = (req,res, next)=>{
  const token = req.cookies.accessToken;
  if(!token) return next(createError(401,"You are not authentication"))
  
  jwt.verify(token, process.env.JWT_KEY,  (err,payload)=>{
    if(err) return next(createError(403,"token is invalid"))
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
  });

};

