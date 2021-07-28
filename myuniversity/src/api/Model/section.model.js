const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SectionSchema = new Schema ({

    speciality:{
        type:String,
        required:true
    },
    option:{
        type:String,
        required:true

    },
    users: 
        [{
         type: Schema.ObjectId,
         ref:"user"
        }  
    ],
    courses: 
        [{
         type: Schema.ObjectId,
         ref:"course"
        }  
    ],

})
module.exports = mongoose.model('section', SectionSchema);