const Course =  require('../Model/course.model');
const Section =  require('../Model/section.model');
const User =  require('../Model/user.model');
const Claim =  require('../Model/claim.model');
const Notification = require("../Model/notification.model");

const mongoose = require('mongoose');
/************************ Add Claim ****************************/

exports.addClaim = async function(req,res,next) {

    var  creationDate = new  Date();
    let claim  = new Claim ({

        subject: req.body.subject,
        description: req.body.description,
        student: req.body.student,


        if (err) {
            if (err.errors) {
                return res.json({success: false, message: err.errors.subject.message});

            } else {
                if (err.errors) {
                    if (err.errors.description) {
                        return res.json({success: false, message: err.errors.email.description});
                    }
                }
            }
        }



                })
    claim.save(function(err,data) {
        if(err){
            next(err);
        }
        else {
            // User.findOne(data.student).exec(function (err, item) {
            //     res.json({
            //         status: 'success',
            //         data:item
            //     });
            // });
            res.json({success: true, message: "claim sent successfully", data: data});

        }
    });




}

//ADMIN
/****************** Get all claims *****************/
exports.claims= async function(req, res, next) {

    try {
        await Claim.find({}).sort("status").exec(function(err,data){
            if(err) return next(err);
            else
               return res.json({success: true,data: data});
        }) ;

    }catch(error) {
        next(error)
    }


};

//ADMIN


//STUDENT
/****************** My claim *****************/
exports.myClaim = async  function(req,res,next)  {
    try {
        let myclaims ;
        console.log("iddd =="+JSON.stringify(req.params.id))

        await Claim.find({ student: req.params.id }).exec(function (user,err) {

            if(err) return next(err)
            console.log("user =="+JSON.stringify(user))
            if(user && user.role ==="STUDENT") {
                if(user.claim) {
                    for(var i = 0 ; i < user.claim.length ; i++) {
                        myclaims.push(user.claim);
                    }
                    return res.json({sucess:true, data:myclaims})
                }
                else {
                    return res.json({sucess:false, message:"No claims added yet..."})

                }

            }
            else {
                return res.json({sucess:false, error:"something went wrong"})

            }


        });

    } catch (error) {
     return    res.json({ sucess: false, message: error.message });
    }
}




//TRAITER Réclamation To PENDING
exports.traiterReclamation = async function  (req, res) {
    try {
        const { id } = req.params;

        Claim.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            { status: "PENDING" },
            function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json("PENDING");
                }
            }
        );
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

//TRAITER Claim to Rejected
exports.rejectReclamation = async function  (req, res) {
    try {
        const { id } = req.params;

        Claim.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            { status: "REJECTED" },
            function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json("REJECTED");
                }
            }
        );
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};
