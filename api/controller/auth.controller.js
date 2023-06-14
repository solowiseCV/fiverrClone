import User from "../models/User.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../ultils/error.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const user= await newUser.save();
    res.status(201).json(user)
  } catch (err) {
    next(err);
};
}
export const login = async (req,res, next)=>{
    try {
      const user = await User.findOne({username:req.body.username});
      if(!user) return next(createError(404,"User Not Found"));
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if(!isCorrect) return next(createError(400,"Wrong password or Username"));
      const token = jwt.sign({
       id:user._id,
        isSeller: user.isSeller
     },process.env.JWT_KEY)
     const {password, ...info}= user._doc;

      res.cookie("accessToken",token,{
        httpOnly:true
      }).status(200).json(info);
      
    } catch (err) {
      next(err)
    }
};
export const logout =async (req,res)=>{
    res.clearCookies("accessToken",{
      sameSite:"none",
      secure:true
    }).status(200).send("user has been logged out")
};
