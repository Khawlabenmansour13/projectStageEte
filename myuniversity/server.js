const express = require('express');

const bodyParser = require('body-parser');


const jwt = require('jsonwebtoken')


const app = express();

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
const user = require('./src/api/Routes/user.routes');
const userModel = require('./src/api/Model/user.model');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//in order to secure our application this function is used to verify token epxiration date otherwise return user connected (current user)

app.set("secretKey","tokentest")


app.use(async (req , res ,next) => {
    console.log("header ="+req.headers["x-access-token"])
    if(req.headers["x-access-token"])
 {
     const accessToken = req.headers["x-access-token"];

     const {id, exp} = await jwt.verify(accessToken,req.app.get("secretKey"));

     //Check if token has expired
     if(exp< Date.now().valueOf()  / 1000) {
        return res.status(401).json({message:"Json web token has expired, please login to get it  :)"});
     }

     //Here we are going to set our current user session 
     console.log("server file userId =="+id)

     res.locals.loggedInUser = await userModel.findById(id)
     console.log("Key private token ="+req.app.get("secretKey"));
     console.log("server file logged in =="+res.locals.loggedInUser)

     next();



 } else {
     next();
 }

}
 
 )

app.use('/user',user);

app.listen(port,()=> {
    console.log("Server is up and runing on port",port);
})