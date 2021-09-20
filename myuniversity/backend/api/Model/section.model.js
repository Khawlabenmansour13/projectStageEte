var mongoose = require('mongoose')

var Schema=mongoose.Schema;
var sectionSchemaa = mongoose.Schema({



    date:Date,
    description :{
        type:String,
        required:false
    },
    nombreCredit :{
        type:Number,
        required:false
    },
    formation :{
        type:String,
        enum:['Business','Computer science','Mecanic','Continu','Civilize'],
        required:false
    },
    typeCycle :{
        type:String,
        enum:['1','2'],
        required:false
    },
    annee :{
        type:String,
        enum:['1er','2eme','3eme','4eme','5eme'],
        required:false
    },

    user:[
        {type:Schema.Types.ObjectId,ref:'user'}
    ],


})
var section =mongoose.model('section',sectionSchemaa,'section');
module.exports=section;
