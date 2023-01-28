



const Notification=require("../models/notification.model");

exports.acceptNotificationRequest= async (req,res)=>{
    const notificationObj={
        
        subject: req.body.subject,
        content: req.body.content,
        recepientEmails: req.body.recepientEmails,
        requester: req.body.requester,
        ticketId: req.body.ticketId
        
    }
    console.log(notificationObj);
    try{
        const notification =  await Notification.create(notificationObj);
        res.status(201).send({
            requestId:notification.ticketId,
            status:"accept request -it is in process"
        });
        
    }catch(err){
        console.log("error while accepting a notifiction request",err.message)
        res.status(500).send({
            message:"error while accepting a notifiction request"
        });

    }
}





exports.getNotificationStatus= async (req,res)=>{
    const  reqId= req.params.id

    try{
        const notification= await Notification.findOne({
            ticketId:reqId
        })

            res.status(200).send({
            requestId : notification.ticketId,
            sentStatus : notification.sentStatus
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Internal error while fetching the notification status"
        })
    }

}