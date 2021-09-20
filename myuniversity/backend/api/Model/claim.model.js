var mongoose = require('mongoose')



//VALIDATORS



let subjectLengthChecker = (subject)=> {
    if(!subject) {
        return false ;
    }
    else {
        if(subject.length < 3 || subject.length > 20){
            return false ;
        }
        else {
            return true;
        }
    }
}

const subjectValidators = [
    {
        validator : subjectLengthChecker , message : "subject must be at least 3 characters but no more than 20"
    },

];



let descriptionLengthChecker = (subject)=> {
    if(!subject) {
        return false ;
    }
    else {
        if(subject.length < 12 || subject.length > 300){
            return false ;
        }
        else {
            return true;
        }
    }
}

const descriptionValidators = [
    {
        validator : descriptionLengthChecker , message : "description must be at least 12 characters but no more than 300"
    },

];

//Define Schema
var Schema = mongoose.Schema;
const claimSchema = new Schema({

    subject: {
        type: String,
        trim: true,
        required: true,

    },
    description: {
        type: String,
        trim: true,
        required: false,


    },
    date: { type: Date, default: Date.now() },

    status :{type: String,         enum : ['IN PROGRESS','PENDING','COMPLETED','REJECTED'],default: "IN PROGRESS"},
    student:
        {type: mongoose.Schema.ObjectId,
            ref: "user"},


});
var claim = mongoose.model('claim', claimSchema)
module.exports = claim
