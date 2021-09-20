var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var unitySchema = mongoose.Schema({

    title:String,
    date:Date,
    description :{
        type:String,
        required:false
    },
    nombreCredit :{
        type:Number,
        required:false
    },
    annee :{
        type:String,
        enum:['1er','2eme','3eme','4eme','5eme'],
        required:false
    },
    sections:[
        {type:Schema.Types.ObjectId,ref:'section'}
    ],
})
var unity =mongoose.model('unity',unitySchema,'unity');
module.exports=unity;
