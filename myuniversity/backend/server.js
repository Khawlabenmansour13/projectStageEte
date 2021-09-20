const express = require('express');

const bodyParser = require('body-parser');


const jwt = require('jsonwebtoken')

//Require cors to e synchronize node js backend with react frontend 

const cors = require('cors');

//REQUIRE SOCKET
const socketIo = require("socket.io");

const http = require('http');

const app = express();
app.use(cors()) // Use this after the variable declaration

const dotenv = require('dotenv');
dotenv.config();


const path =require('path')

// app.js


const mongoose = require('mongoose'); 


let port =8000;
let deb_url = "mongodb://localhost:27017/mydb";


const mongoDB =  process.env.mongoDB_URI ||  deb_url ;

mongoose.connect(mongoDB,{ useNewUrlParser: true } );
mongoose.Promise = global.Promise;

const etatDb =mongoose.connection;
etatDb.on('error',console.error.bind(console,"There is an error connection in our MongoDb "));

etatDb.on('ready',function() {
    console.log("Database connection successfully");
})

//appel  routes user = GET USER ROUTES 
const user = require('./api/Routes/user.routes');
const department = require('./api/Routes/department.routes');
const section = require('./api/Routes/section.routes')
const course = require('./api/Routes/course.routes')
const mark = require('./api/Routes/note.routes')
const notification = require('./api/Routes/notification.routes');
const claim = require('./api/Routes/claim.routes');
const schedule = require('./api/Routes/schedule.routes');


const userModel = require('./api/Model/user.model')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));





//in order to secure our application this function is used to verify token epxiration date otherwise return user connected (current user)

app.set("secretKey","tokentest")



app.use(async (req , res ,next) => {

    
 {


     //Check if token has expired
     try {
        console.log("header ="+req.headers["x-access-token"])
        if(req.headers["x-access-token"])
        {
            const accessToken = req.headers["x-access-token"];
            // verify access token ely7atihtha enti f i header  with token ely mawjouda fi secretkey
            const {id, exp} = await jwt.verify(accessToken,req.app.get("secretKey"));
              //Here we are going to set our current user session 
     console.log("server file userId =="+id)

     res.locals.loggedInUser = await userModel.findById(id) // user connecte and set loogedInUser session
     console.log("Key private token ="+req.app.get("secretKey"));
     console.log("server file logged in =="+res.locals.loggedInUser)

     next();

        }
        else {
            next();
        }
     
     }catch(err) {
            return res.status(401).json({message:"Json web token has expired, please login to get it  :)"});
         
     }
    

   


 } 

}
 
 )
 

//Use cors 

app.use('/user',user);
app.use('/department',department);
app.use('/section',section);
app.use('/course',course)
app.use('/mark',mark)
app.use('/notification',notification)
app.use('/claim',claim)
app.use('/schedule',schedule)

let socketList = {};

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {

    //mark
    socket.on("send-mark", function (data) {
        io.emit("new-mark", data);
    });



    //test if user exist or not
    console.log(`New User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("User disconnected!");
    });

    socket.on("BE-check-user", ({ roomId, userName }) => {
        let error = false;

        io.sockets.in(roomId).clients((err, clients) => {
            clients.forEach((client) => {
                if (socketList[client] == userName) {
                    error = true;
                }
            });
            socket.emit("FE-error-user-exist", { error });
        });
    });


    //test if user exist or not
    console.log(`New User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("User disconnected!");
    });

})
io.on("connection", (socket) => {
    socket.on("addNewNotification", function (data) {
            io.emit("newNotification", data);
            console.log("Notification is working===" + JSON.stringify(data));
        }
    )
})
server.listen(port,()=> {
    console.log("Server is up and runing on port",port);
})
