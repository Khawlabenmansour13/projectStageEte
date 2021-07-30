
const Section =  require('../Model/section.model');
const User =  require('../Model/user.model');
/************************ Add Department ****************************/

exports.addSection = async function(req,res,next) {

    var date = new Date();
      let section  = new Section ({

        title: req.body.title,
        speciality: req.body.speciality,
        level: req.body.level,
        date: date,
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

    
   //affect section users 
exports.addUsersToSection = async function(req,res,next)  {
  try {
    const userId = req.params.userId;
    const sectionId = req.params.sectionId;
    console.log(userId)
    const section = await Section.findById(sectionId);
    const user = await User.findById(userId);

    if(section.users.indexOf(user._id)!= -1) {//ylawej al user selon indice dans le table user  mawjoud diff de -1
      return  res.status(401).json({sucess: "Exist",message: "user already exists in this section"});

    }
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
     await Section.find({}).populate('users').exec(function(err,data){
            if(err) return next(err);
            else
            res.status(200).json({sucess: "OK",data: data});

      }) ;
  
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
  




     /****************** Get section by email*****************/
exports.getUsersSectionByTitle = async function(req ,res ,next) { 
  
  console.log("hiiiiii I am in ")
  try {
    var title = req.params.title;
    console.log(title);

    await Section.findOne({title:title}).populate('users','email')
    .exec(function(err,data) {
      if(err) return next(err);

      else if(!data) 
       res.status(404).json({failed: "Not Ok",message:"This section does not contain any users or try to put another title."});
      
      else res.status(200).json({sucess: "OK",data: data});
  
    })


   

  }catch(error) {
    next(error)
  }
   
}

{/*Get Section Computer Sceince */}

exports.getSectionComputerScience = async function(req, res , next) {
      
  await Section.find()
    .then((data) => {

      let listComputerSection= [];
      data.forEach(element => {
        if(element.speciality === 'Computer science') {
          listComputerSection.push(element);
        }
      })
      res.json(listComputerSection);
    });

  
                 

}