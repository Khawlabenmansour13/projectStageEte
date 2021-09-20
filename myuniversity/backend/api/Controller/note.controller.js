
const Mark =  require('../Model/note.model');
const User =  require('../Model/user.model');
const Department = require("../Model/department.model");
/************************ Add Note ****************************/

exports.addMark = async function(req,res,next) {

    let mark = new Mark({

        codeELab: req.body.codeELab,
        identifiant: req.body.identifiant,
        modality: req.body.modality,
        year: req.body.year,
        groupeName: req.body.groupeName,
        EEName: req.body.EEName,
        cin: req.body.cin,
        numInscription: req.body.numInscription,
        mark: req.body.mark,
        session: req.body.session,
        email:req.body.email,
        test :req.body.test,
        ds : req.body.ds,
        moyCC :req.body.moyCC,
        moyTp :req.body.moyTp,
        exam :req.body.exam,
        user:req.body.user,
        section:req.body.section



    })

    mark.save(function (err, data) {
        if (err) {
            next(err);
        } else {
            res.json({success: true, message: "mark added successfully", data: data});

        }
    });
}


    /****************** Get all Notes *****************/
    exports.getAllMarks= async function(req, res, next) {


        Mark.find({})
            .then((data) => {
                res.json({data});
            })
            .catch((e) => {
                console.log(e);
            });
    };


/****************** Get all Notes *****************/
exports.getNoteByUser= async function(req, res, next) {

    Mark.find({ email:req.body.email }).exec((err, mark) => {
        if (mark) {
            return res.json({success: true, data:mark});

        }
        return res.json({success:false,message:"No Mark for you!!"})
    });

};

/***********SEARCH NOTE BY USER************************/
exports.search = async function(req,res) {
    var email = req.query.email;
    let query = {
        email
    };
    console.log("query search =="+JSON.stringify(query))
    Mark.find(query)
        .sort('-year')
        .then(data => {
            if(data )
            res.json(data);
            else
                res.json({message:"Student with this email not have Mark !!"})
        })
        .catch(err => res.status(400).json(err));
}


/****************** Delete Note*****************/


    exports.deleteNote = async function (req ,res ,next) {
        Mark.findByIdAndRemove(req.params.id).then(() => console.log('ok'));
        res.json('ok');
    }


/****************** Get Note by id*****************/

exports.getNoteById = async function  (req,res,next ){

    try {
        const id = req.params.id;
        console.log(id);
        const mark = await Mark.findById(id);

        if(!mark) {
            res.json({failed: "Not Ok",message:"mark not found please try again "});
        }
        res.json({sucess: "OK",data: mark});


    }catch(error) {
        next(error)
    }
}


/****************** Update NOTE*****************/
exports.updateNote = async function(req  ,res, next) {


    try {
        const id = req.params.id;
        const newDataNote  = req.body ;
        await Mark.findByIdAndUpdate(id, newDataNote);
        const NoteAfterUpdate = await  Mark.findById(id);
        res.status(200).json({sucess: "OK",data: NoteAfterUpdate,message :"Mark has been updated !!"});



    }catch(error) {
        next(error);


    }
}
