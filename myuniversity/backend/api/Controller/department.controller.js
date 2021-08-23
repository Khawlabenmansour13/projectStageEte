
const Department =  require('../Model/department.model');
const User =  require('../Model/user.model');
/************************ Add Department ****************************/

exports.addDepartment = function(req,res,next) {


  
    let department  = new Department ({

        name: req.body.name,
        block: req.body.block,
      
  
    })

    department.save(function(err) {
        
        if(err){
            next(err);
        }
            else {
              res.json({success:true , message :"Department added successfully",data: department});

            }
          
        });



}


/****************** Get all department *****************/
exports.getAllDepartment= async function(req, res, next) {
  
    try {
      const departmentsList =await Department.find({});
  
      res.status(200).json({sucess: "OK",data: departmentsList});
    }catch(error) {
      next(error)
    }
  
  
  };
  
  /****************** Get Department by id*****************/
  
  exports.getDepartmentbyId = async function  (req,res,next ){
  
    try {
      const departmentId = req.params.departmentId;
      console.log(departmentId);
      const department = await Department.findById(departmentId);
  
      if(!department) {
        res.status(404).json({failed: "Not Ok",message:"department not found please try again "});
      }
      res.status(200).json({sucess: "OK",data: department});
  
  
    }catch(error) {
      next(error)
    }
  }
  /****************** Update department*****************/
  exports.updateDepartment = async function(req  ,res, next) {
  
  
    try {
      const departmentId = req.params.departmentId;
      const newDataDepartment  = req.body ;
      await Department.findByIdAndUpdate(departmentId, newDataDepartment);
      const departmentAfterUpdate = await  Department.findById(departmentId);
      res.status(200).json({sucess: "OK",data: departmentAfterUpdate,message :"Department has been updated !!"});
  
  
  
    }catch(error) {
      next(error);
    
    
    }
  }
  /****************** Delete Department*****************/
  
  exports.deleteDepartment = async function (req ,res ,next) {
    try {
      const departmentId = req.params.departmentId;
      const department= await Department.findById(departmentId);
      if(!department) {
        res.status(404).json({failed: "Not Ok",message:"department not found please try again "});
  
      }
       await Department.findByIdAndDelete(departmentId);
  
      res.status(200).json({sucess: "OK",data: null, message: "department has been deleted !!"});
    }catch(error) {
      next(error)
    }





  }
  


  /****************** Get department by name*****************/
exports.getDepartmentByName = async function(req ,res ,next) { 
  

    try {
      const name = req.params.name;
      console.log(name);
      const department = await Department.find({name});
  
      if(!department) {
        res.status(404).json({failed: "Not Ok",message:"name department not found please try again "});
      }
      res.status(200).json({sucess: "OK",data: department});
  
  
    }catch(error) {
      next(error)
    }
  }

    /****************** Affect user to department *****************/
  exports.affectUserDepartement   = async function(req, res,next) {
      
  
        const departmentId = req.params.departmentId;
        const userId = req.params.userId;
        //search user
        const user = await User.findById(userId)
        //search departement 
          await Department.findOne({_id:departmentId})
                                                    
        .exec (function(err, dep){
            if(err) return res.send(err);// same as next
           
       
            console.log("user="+user._id);
            console.log("dep ="+dep.user);
            if(dep.user.indexOf(user._id)!= -1) {//ylawej al user selon indice dans le table user  mawjoud diff de -1
              return  res.status(401).json({sucess: "Exist",message: "user already exists in this department"});

            }
            dep.user.push(user); //push  zid fi pos lekher mil lowkher 
         dep.save(function(err,data){ // comme spring (mise a jour dans le table dep id de user el jdid ei besh n'affecti
          // todo
          return  res.status(200).json({sucess: "OK",message: "user affected successfully to department", data : data});
            
       });
      });
      };
