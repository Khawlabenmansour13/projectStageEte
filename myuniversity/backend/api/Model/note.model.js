const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema ({

    codeELab : {
        type:String,
        required : true
    },
    identifiant : {
        type:String,
        required : true
    },
    modality : {
        type:String,
        required : true
    },
    year: {
        type:String,required:true
    },
    groupeName: {
        type:String,required:true
    },
    EEName: {
        type:String,required:true
    },
    cin: {
        type:Number,required:true,
        unique:true,
        maxLength:8
    },
    numInscription: {
        type:String,required:true,
        unique:true
    },
    email: {
        type:String,required:true,
    },

    mark: {
        type:Number,required:true
    },


    test : {
        type:String,required:true
    },

    ds : {
        type:String,required:true
    },
    moyCC : {
        type:String,required:true
    },

    moyTp : {
        type:String,required:false
    },
    exam: {
        type:String,required:true

    },

    session: {
        type:String,required:true
    },




    user:
        {
            type: Schema.ObjectId,
            ref:"user"
        },
    section:
        {
            type:String,required:true

        }

})
module.exports = mongoose.model('note', noteSchema);
