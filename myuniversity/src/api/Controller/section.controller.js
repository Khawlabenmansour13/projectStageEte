
const Section =  require('../Model/section.model');
const User =  require('../Model/user.model');
/************************ Add Department ****************************/

exports.addSection = async function(req,res,next) {

      let section  = new Section ({

        speciality: req.body.speciality,
          option: req.body.option
          
        
    
      })
      section.save(function(err,data) {
        if(err){
          next(err);
      }
          else {
            res.json({success:true , message :"section added successfully",data: section});

          }
      });





    }

    
   //affect section course 
exports.addUsersToSection = async function(req,res,next)  {
  try {
    const userId = req.params.userId;
    const sectionId = req.params.sectionId;
    console.log(userId)
    const section = await Section.findById(sectionId);
    const user = await User.findById(userId);

   section.users.push(user);

   await section.save(function(err,data) {
     if(err) return next(err);
     else  {
      res.status(200).json({success:true, data :data});

     }
   })

  }catch(err) {
    return res.status(400).json({sucess:false,message : err.message})
  }

}








/****************** Get all section *****************/
exports.getAllsections= async function(req, res, next) {
  
    try {
      const sectionsList =await Section.find({});
  
      res.status(200).json({sucess: "OK",data: sectionsList});
    }catch(error) {
      next(error)
    }
  
  
  };
  
  /****************** Get section by id*****************/
  
  exports.getSectionbyId = async function  (req,res,next ){
  
    try {
      const sectionId = req.params.sectionId;
      console.log(sectionId);
      const section = await Section.findById(sectionId);
  
      if(!section) {
        res.status(404).json({failed: "Not Ok",message:"section not found please try again "});
      }
      res.status(200).json({sucess: "OK",data: section});
  
  
    }catch(error) {
      next(error)
    }
  }
  /****************** Update section*****************/
  exports.updateSection = async function(req  ,res, next) {
  
  
    try {
      const sectionId = req.params.sectionId;
      const newDataSection  = req.body ;
      await Section.findByIdAndUpdate(sectionId, newDataSection);
      const sectionAfterUpdate = await  Section.findById(sectionId);
      res.status(200).json({sucess: "OK",data: sectionAfterUpdate,message :"Section has been updated !!"});
  
  
  
    }catch(error) {
      next(error);
    
    
    }
  }
  /****************** Delete Section*****************/
  
  exports.deleteSection = async function (req ,res ,next) {
    try {
      const sectionId = req.params.sectionId;
      const section= await Section.findById(sectionId);
      if(!section) {
        res.status(404).json({failed: "Not Ok",message:"section not found please try again "});
  
      }
       await Section.findByIdAndDelete(sectionId);
  
      res.status(200).json({sucess: "OK",data: null, message: "section has been deleted !!"});
    }catch(error) {
      next(error)
    }





  }
  


  /****************** Get section by name*****************/
exports.getSectionBySpeciality = async function(req ,res ,next) { 
  

    try {
      const speciality = req.params.speciality;
      console.log(speciality);
      const section = await Section.find({speciality});
  
      if(!section) {
        res.status(404).json({failed: "Not Ok",message:"speciality section not found please try again "});
      }
      res.status(200).json({sucess: "OK",data: section});
  
  
    }catch(error) {
      next(error)
    }
  }

     /****************** Get section by name*****************/
exports.getSectionbyEmailUser = async function(req ,res ,next) { 
  

  try {
    const email = req.params.email;
    console.log(speciality);
    const emailSectionUser = section.users.email
    const section = await Section.find({emailSectionUser:email});

    if(!section) {
      res.status(404).json({failed: "Not Ok",message:"speciality section not found please try again "});
    }
    res.status(200).json({sucess: "OK",data: section});


  }catch(error) {
    next(error)
  }
}