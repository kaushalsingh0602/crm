const express = require("express");
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const bcrypt= require("bcryptjs")




const app =  express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL, () => {
    console.log("MongoDB connected");
    init();
})
 async function init(){
    var user= await User.findOne({userId:"admin" });

    if(user){
        return;
    }else{

//admin
    const user=await User.create({
        name:"kaushal",
        userId:"admin",
        email:"kaushalsingh8178@gamil.com",
        userType:"ADMIN",
        password: bcrypt.hashSync('welcome06',8)
    })
    console.log("admin is created")
  }
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);

module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})