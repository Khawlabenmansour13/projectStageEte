
const Section =  require('../Model/section.model');
const User =  require('../Model/user.model');
const Mark = require("../Model/note.model");
/************************ Add Department ****************************/

exports.addSection = async function(req,res,next) {

    var date = new Date();
      let section  = new Section ({
          nombreCredit: req.body.nombreCredit,
          description: req.body.description,
          formation: req.body.formation,
        date: date,
          typeCycle: req.body.typeCycle,
          annee: req.body.annee,

        
    
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
        const userId = req.params.idStudent;
        const sectionId = req.params.idSection;
        console.log(userId)
        const section = await Section.findById(sectionId);
        const user = await User.findById(userId);

        if(section.user.indexOf(user._id)!== -1) {//ylawej al user selon indice dans le table user  mawjoud diff de -1
            return  res.status(401).json({sucess: "Exist",error: "user already exists in this section"});

        }
        section.user.push(user);

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
     await Section.find({}).populate('user').exec(function(err,data){
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
      const sectionId = req.params.id;
      console.log(sectionId);
      const section = await Section.findById(sectionId);
  
      if(!section) {
        res.json({failed: "Not Ok",message:"section not found please try again "});
      }
      res.json({sucess: "OK",data: section});
  
  
    }catch(error) {
      next(error)
    }
  }
  /****************** Update section*****************/
  exports.updateSection = async function(req  ,res, next) {
  
  
    try {
      const id = req.params.id;
      const newDataSection  = req.body ;
      await Section.findByIdAndUpdate(id, newDataSection);
      const sectionAfterUpdate = await  Section.findById(id);
      res.status(200).json({sucess: "OK",data: sectionAfterUpdate,message :"Section has been updated !!"});
  
  
  
    }catch(error) {
      next(error);
    
    
    }
  }
  /****************** Delete Section*****************/
  
  exports.deleteSection = async function (req ,res ,next) {
    try {
      const id = req.params.id;
      const section= await Section.findById(id);
      if(!section) {
        res.status(404).json({failed: "Not Ok",message:"section not found please try again "});

      }
       await Section.findByIdAndDelete(id);
  
      res.status(200).json({sucess: "OK",data: null, message: "section has been deleted !!"});
    }catch(error) {
      next(error)
    }






  }

exports.search = async function(req,res) {
    var formation = req.query.formation;
    console.log("formation="+formation);
    let query = {
        formation
    };
    console.log("query search =="+JSON.stringify(query))
    Section.find(query)
        .then(data => {
            if(data )
                res.json(data);
            else
                res.json({message:"Speciality  not found !!"})
        })
        .catch(err => res.status(400).json(err));
}






/****************** Get section by email*****************/
exports.getUsersSectionByTitle = async function(req ,res ,next) { 
  
  console.log("hiiiiii I am in ")
  try {
    var formation = req.params.formation;
    console.log(formation);

    await Section.findOne({formation:formation}).populate('user','email')
    .exec(function(err,data) {
      if(err) return next(err);

      else if(!data) 
       res.status(404).json({failed: "Not Ok",message:"This section does not contain any users or try to put another formation."});
      
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
        if(element.formation === 'Computer science') {
          listComputerSection.push(element);
        }
      })
      res.json(listComputerSection);
    });




}

 {/*Get Section mecanic */}
 exports.getSectionMecanic = async function(req , res , next ){

  await Section.find()
    .then ((data)=>{ 
      let listMecanicSection= [];
      data.forEach(element =>{
       if(element.formation === 'Mecanic'){
         listMecanicSection.push(element);
       }
      })
      res.json(listMecanicSection);
      
        
       
      });
    
    }

     {/*Get Section business */}
 exports.getSectionBusiness= async function(req , res , next ){

  await Section.find()
    .then ((data)=>{ 
      let listBusinessSection= [];
      data.forEach(element =>{
       if(element.formation === 'Business'){
         listBusinessSection.push(element);
       }
      })
      res.json(listBusinessSection);
      
        
       
      });
    
    }

  {/*Get Section  Civilize section   */}
 exports.getSectionCivilize= async function(req , res , next ){

  await Section.find()
    .then ((data)=>{ 
      let listCivilizeSection= [];
      data.forEach(element =>{
       if(element.formation === 'Civilize'){
         listCivilizeSection.push(element);
       }
      })
      res.json(listCivilizeSection);
      
        
       
      });
    
    }

     {/*Get Section  Continu section   */}
 exports.getSectionContinu= async function(req , res , next ){

  await Section.find()
    .then ((data)=>{ 
      let listContinuSection= [];
      data.forEach(element =>{
       if(element.formation === 'Continu'){
         listContinuSection.push(element);
       }
      })
      res.json(listContinuSection);
      
        
       
      });
    
    }
    
  
   


