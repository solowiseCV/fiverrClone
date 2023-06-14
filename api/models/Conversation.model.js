import mongoose from "mongoose";
const {Schema} = mongoose;
const ConversationSchema = new Schema({
  id :{
    type:String,
    required: true,
    unique:true,
  },
  isellerId :{
    type:String,
    required: true,
   
  },
  readByBuyer :{
    type:Boolean,
    required: true, 
  },
  
  readBySeller :{
    type:Boolean,
    required: true,
  },
  
  lastMessage:{
    type:String,
    required: false,
 
  },
  
},{timestamps:true})
export default mongoose.model("Conversation ", ConversationSchema);