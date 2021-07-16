const express = require('express');

const bodyParser = require('body-parser');

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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.set("secretKey","tokentest")
app.use('/user',user);

app.listen(port,()=> {
    console.log("Server is up and runing on port",port);
})