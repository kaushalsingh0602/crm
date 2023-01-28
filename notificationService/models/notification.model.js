
const mongoose=require("mongoose");
const  constants  = require("../utils/constants");

const notificationSchema=  new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    ticketId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    recepientEmails:{
        type:[String],
        required:true
    },
    reqester:{
        type:String,
        
    },
  
    sentStatus:{
        type:String,
        required:true,
        default:constants.sentStatuses.unsent
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
})


module.exports=mongoose.model("Notification",notificationSchema);
   