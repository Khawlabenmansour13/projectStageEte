const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const departementSchema = new Schema ({

    name : {
        type:String,
        required : true 
    },

    block : {
        type: String,
        required: true,
        unique: true,
        maxlength: 1
    },
    user: 
        [{
         type: Schema.ObjectId,
         ref:"user"
        }  
    ]
})
module.exports = mongoose.model('department', departementSchema);