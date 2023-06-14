import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import reviewRoute from "./routes/review.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config(); 

mongoose.set('strictQuery',true)
try {
    await mongoose.connect('mongodb+srv://solowise:uche1nna2@cluster0.kmjkqlu.mongodb.net/?retryWrites=true&w=majority&dbname=fiverr');
   console.log("connected to database")
} catch (err) {
    console.log(err)
}
 app.use(cors({origin:"http://localhost:5173",Credential:true}));
app.use(express.json());
app.use(cookieparser());

app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authRoute);
 
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "somethin went wrong"
    return res.status(errorStatus).send(errorMessage)
})

app.listen(3000,()=>{
    console.log("Backend runnimg with speed like light....")
})