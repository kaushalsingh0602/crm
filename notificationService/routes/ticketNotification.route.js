/***
 * tis will content routs of the notifiction request
 */

const notificationController =require("../controllers/notification.controller")

module.exports=(app)=>{
    app.post("/notifServ/api/v1/notifications",notificationController.acceptNotificationRequest);

    app.get("/notifServ/api/v1/notifications/:id",notificationController.getNotificationStatus);
    
}