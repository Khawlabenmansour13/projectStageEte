const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SectionSchema = new Schema ({

    title:{
        type:String,
        required:true
    },
    option:{
        type:String,
        required:true

    },

    speciality:{
        type:String,
        enum:['Computer science','mecanic','continue','business','Civilize'],
        required:true
    },
    date:Date,

    level:{
        type:String,
        enum:['1er','2éme','3éme','4éme','5éme'],
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