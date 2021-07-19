const mongoose = require('mongoose');

const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema =new  Schema({

    firstName: {
        type: String,
        required : true,
    },

    lastName: {
        type: String,
        required : true,
    },

    phone : {
        type : String ,
        required: true
    },


    email : {
        type : String ,
        required: true
    },
    
    password: {
        type : String ,
        required: true
    },

    
    country: {
        type : String ,
        required: true
    },

     role :{
         type:String,
         enum : ['ADMIN','STUDENT','TEACHER','SUPER_ADMIN']

     }

}).pre('save',function(next) {
    this.password =bcrypt.hashSync(this.password,10);
    next();

})

module.exports = mongoose.model('user', userSchema);