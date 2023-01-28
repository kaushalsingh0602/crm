//this file have thee logic for send mail

const nodemailer=require("nodemailer");


module.exports =nodemailer.createTransport({
//const transporter =nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user :'kaushal049.hitcse2020@gmail.com',
        pass :'mhemfppgqberczqd'
    },
    secure:true
});
/**
 * 
 * 
 * transporte is used to send email
 */
// const mailDataObj={
//     from:'salmankabaapp@gmail.com',
//     to: 'kaushalsingh8178@gmail.com ,kaushal8178singh@gmail.com ,suprabhashekhar99@gmail.com , supriyashekhar2000@gmail.com',
//     subject: "verry importent message",
//     text: "There nothing important thren time in life !  "
// }
// transporter.sendMail(mailDataObj,(err,info)=>{
//     if(err){
//         console.log("erroe hai bahi",err)
//     }
//     else{
//         console.log(info);
//     }
// })