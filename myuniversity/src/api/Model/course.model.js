const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Coursechema = new Schema ({

    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true

    },
    creationDate: {
        Type:Date.now(),
        required:true
    },
    description: {
        type:String,
        required:true
    },
    categories :{
        type:String,
        enum : ['Business','Health','Technologies','Scientist']

    },
    users: 
        [{
         type: Schema.ObjectId,
         ref:"user"
        }  
    ],
    section: 
    {
     type: Schema.ObjectId,
     ref:"section"
    }  

})


module.exports = mongoose.model('course', Coursechema);