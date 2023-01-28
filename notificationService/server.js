

const express=require("express");
const bodyParser=require("body-parser")
const mongoose=require("mongoose");
const dbConfig=require("./configs/db.config");
const serverConfig=require("./configs/server.config")


const app= express();

//registter the body-parser middleware to express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL, () => {
    console.log("MongoDB connected");
   
},err=>{
    console.log("error while conecting",err.message)
})



require('./routes/ticketNotification.route')(app);
require('./crons/cron')

module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})