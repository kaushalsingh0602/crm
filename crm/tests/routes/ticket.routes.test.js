/**
 *  app.post("/crm/api/v1/tickets",
 * [authJwt.verifyToken],ticketController.createTicket);
 */
const User=require("../../models/user.model");
const config=require("../../configs/auth.config");
const client =require("../../utils/NotificationServiceClient").client;
const db= require("../db");
const request=require("supertest");
const app=require("../../server");
const jwt = require("jsonwebtoken");
const Ticket= require("../../models/ticket.model")

beforeAll ( async ()=>{

    
    await  db.clearDatabase();


    await User.create({
        name: "rakesh1",
        userId: 1,
        email: "amarcdsy@gail.com",
        password:"welcome1",
        userType:"ENGINEER",
        userStatus:"APPROVED"
    })

})


afterAll( async ()=>{
    await db.closeDatabase();

})

const ticketRequestBody={
    title:"Test",
    ticketPrioroty:4,
    description:"Test",
    status:"OPEN",
    assignee:1

}
const ticketUpdateRequestBody = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "CLOSED",
    assignee: 1
}
var ticketId;

describe("testing the post call of ticket routes",()=>{
    const apiEndpoint   ="/crm/api/v1/tickets";
//***creat tocken */
    const token = jwt.sign({id:1}, config.secret,{
        expiresIn : 600
    });
    /**mock the notificATION SERVICE */

    jest.spyOn(client, 'post').mockImplementation((url, args, cb) => cb("Test", null));

    it ("it shoud be for the create ticket ",async ()=>{


        const res= await request(app).post(apiEndpoint).set("x-access-token",token).send(ticketRequestBody);
        ticketId=res.body.id

        expect(res.statusCode).toEqual(201);
    })

})
describe("Update ticket : PUT API", () => {

    /**
     * Mock the notification service
     */
    jest.spyOn(client, 'post').mockImplementation((url, args, cb) => cb("Test", null));

    const token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 600
    });



    it("I should be able to update", async () => {

        const createdTicket = await Ticket.create(ticketRequestBody);
        console.log(createdTicket._id);
        const apiEndpoint = "/crm/api/v1/tickets/" + createdTicket._id;
        const res = await request(app).put(apiEndpoint)
            .set("x-access-token", token).send(ticketUpdateRequestBody);

        expect(res.statusCode).toEqual(200);

    });


})