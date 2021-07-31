const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { Access } = require('accesscontrol');
const Schema = mongoose.Schema;


// Form Submission validation 
let firstNameLengthChecker = (firstName)=> {
    if(!firstName) {
        return false ;
    }
    else {
        if(firstName.length < 3 || firstName.length > 20){
            return false ;
        }
        else {
            return true; 
        }
    }
}


let validFirstNameChecker = (firstName)=> {
    const regExp = new RegExp( /^[a-zA-Z\-]+$/);
    return regExp.test(firstName);
}




const firstNameValidators = [
    {
        validator : firstNameLengthChecker , message : "firstName must be at least 3 characters but no more than 20"
    },
    {
        validator : validFirstNameChecker , message :"Could not contain any special character"
    }
];

let lastNameLengthChecker = (lastName)=> {
    if(!lastName) {
        return false ;
    }
    else {
        if(lastName.length < 3 || lastName.length > 20){
            return false ;
        }
        else {// email >=5 && email <=50
            return true; 
        }
    }
}


let validlastNameChecker = (lastName)=> {
    const regExp = new RegExp( /^[a-zA-Z\-]+$/);
    return regExp.test(lastName);
}




const lastNameValidators = [
    {
        validator : lastNameLengthChecker , message : "lastName must be at least 3 characters but no more than 20"
    },
    {
        validator : validlastNameChecker , message :"Could not contain any special character"
    }
];


let emailLengthChecker = (email)=> {
    if(!email) {
        return false ;
    }
    else {
        if(email.length < 5 || email.length > 50){
            return false ;
        }
        else {// email >=5 && email <=50
            return true; 
        }
    }
}

let validEmailChecker = (email)=> {
    if(!email) {
        return false ;
    }
    else {
        const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
   
        return regExp.test(email);
    }
}



let passwordLengthChecker = (password)=> {
    if(!password) {
        return false ;
    }
    else {
        if(password.length < 6|| password.length > 35){
            return false ;
        }
        else {// email >=5 && email <=50
            return true; 
        }
    }
}

let validPasswordChecker = (password)=> {
    if(!password) {
        return false ;
    }
    else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)
   
        return regExp.test(password);
    }
}




let phoneLengthChecker = (phone)=> {
    if(!phone) {
        return false ;
    }
    else {
        if(phone.length < 6 || phone.length > 20){
            return false ;
        }
        else {// email >=5 && email <=50
            return true; 
        }
    }
}

let validphoneChecker = (phone)=> {
    if(!phone) {
        return false ;
    }
    else {
        const regExp = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
   
        return regExp.test(phone);
    }
}




const emailValidators = [
    {
        validator : emailLengthChecker , message : "E-mail must be at least 5 characters but no more than 50"
    },
    {
        validator : validEmailChecker , message :"Must be a valid E-mail"
    }
];

const passwordValidator = [
    {
        validator : passwordLengthChecker , message : "password must be at least 6 characters but no more than 35"
    },
    {
        validator : validPasswordChecker , message :"Must have at least one uppercase, lowercase,specail character and number."
    }
];

const phoneValidators = [
    {
        validator : phoneLengthChecker , message : "phone must be at least 6 characters but no more than 20"
    },
    {
        validator :  validphoneChecker , message :"Must be a valid  phone"
    }
];


const userSchema =new  Schema({

    firstName: {
        type: String,
        required : true,
        validate:firstNameValidators
    },

    lastName: {
        type: String,
        required : true,
        validate : lastNameValidators
    },

    phone : {
        type : String ,
        required: true,
        validate: phoneValidators
    },


    email : {
        type : String ,
        required: true,
        validate:emailValidators,
        unique:true

    },
    
    password: {
        type : String ,
        required: true,
        validate:passwordValidator
    },

    
    country: {
        type : String ,
        required: true
    },

    image :{
        type: String, 
        trim:true,
        required:true

        },

    role :{
         type:String,
         enum : ['ADMIN','STUDENT','TEACHER','SUPER_ADMIN']

     },
     accesstoken : {
         type:String
     },
     department: 
       {
        type: Schema.ObjectId,
        ref:"department"
       } ,
       section: 
       {
        type: Schema.ObjectId,
        ref:"section"
       }  

   

}).pre('save',function(next) {
    this.password =bcrypt.hashSync(this.password,10);
    next();

})

module.exports = mongoose.model('user', userSchema);