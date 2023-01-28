const cron= require("node-cron")
const Notification=require("../models/notification.model")
const constants= require("../utils/constants")
const emailTransporter =require("../notifier/emailService")


/**
     * i need to send email 
     * get all the ;lis to email notifiction to sent
     * send eamil for each notificatin
     */
cron.schedule('*/30 * * * * *',async ()=>{
    //console.log("hlo");
    
    const notifications= await Notification.find({
        sentStatus : constants.sentStatuses.unsent
        
    })
   
    
    notifications.forEach(notification =>{
        const mailData={
            from:'cer-notifierapp@gmail.com',
            to: notification.recepientEmails,
            subject: notification.subject,
            text: notification.content
        };
        
        
        emailTransporter.sendMail(mailData,async (err,info)=>{
            if(err){
                console.log("erroe hai bahi",err.message)
            }
            else{
                 const savedNotification=await Notification.findOne({
                 _id : notification._id 
                 });
                 savedNotification.sentStatus=constants.sentStatuses.sent;
                 await savedNotification.save();
            }
        })

    })
})