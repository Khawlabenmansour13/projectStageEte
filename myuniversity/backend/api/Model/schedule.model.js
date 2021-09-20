var mongoose = require('mongoose')

var Schema=mongoose.Schema;



let counter = 1;
let CountedId = {type: Number, default: () => counter++};


var scheduleSchema = mongoose.Schema({
    Id: CountedId
,

    Subject:{
        type:String
    },
    StartTime:{
        type : Date
    },


    EndTime:{
        type : Date
    },
    IsAllDay:{
        type:Boolean,
        default:false
    },
    RecurrenceRule  :{
        type:String,

    },

    student :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },

},{
    collection: 'schedule'

})



var schedule =mongoose.model('schedule',scheduleSchema,'schedule');
module.exports=schedule;

