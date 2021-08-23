const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Coursechema = new Schema ({

    title:{
        type:String,
        required:true
    },
    image:{
        type:String,

    },
    creationDate: {
        Type:Date,
      
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