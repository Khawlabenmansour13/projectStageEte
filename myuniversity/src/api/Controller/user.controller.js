
const User =  require('../Model/user.model');
const Department =  require('../Model/department.model');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var  fs = require('fs');
const multer = require('multer')

const {roles} = require('../../_helper/roles');


/******************Sign UP**************** */
exports.signUp = function(req,res,next) {

  //Upload Image 
  var file  = __dirname+'/uploads/images/'+ req.file.originalname;
  console.log("file="+file)
  fs.readFile(req.file.path,function(err,data){
    fs.writeFile(file,data,function(err) {
      if(err) {
        var response = {
          message:'Sorry FIle could not be uploaded.',
          filename: req.file.originalname
        }
        res.json(response);
      }
      else {
        var response = {
          message:'File uploaded successfully',
          filename: req.file.originalname
        }
      }
    })
  })
  
    let user = new User ({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        country : req.body.country,
        role : req.body.role,
        image:req.file.originalname
    })

    user.save(function(err) {
        if(err) 
          {
            if(err.code == 11000) {
              return   res.json({success:false , message: "E-mail already exists !"});

            }
         
          else{
            if(err.errors) {
              if(err.errors.email) {
                return   res.json({success:false , message :err.errors.email.message});
                }
                else {
                  if(err.errors.firstName) {
                    return   res.json({success:false , message :err.errors.firstName.message});
    
                  }
                  else {
                    if(err.errors.lastName) {
                      return   res.json({success:false , message :err.errors.lastName.message});
      
                    }
                    else {
                      if(err.errors.password) {
                        return   res.json({success:false , message :err.errors.password.message});
     
                      }
                      else {
                        if(err.errors.phone) {
                          return   res.json({success:false , message :err.errors.phone.message});
       
                        }
                    }
                      
                    }
                  }
                }
  
                 
              
            }
          
       
            else {
              res.json({success:false , message :"could not save user eroror ",err});

            }
          }

          }
          
          const token = jwt.sign({id : user._id},req.app.get("secretKey"),{expiresIn:'24h'});
          user.accesstoken  = token;
          res.json({sucess:"User created successfully!!" , data: user})
    })              
}



/******************Sign In**************** */

exports.signIn =  function(req,res,next) {

  email =  req.body.email;
  console.log(email);
  User.findOne({email})
   
.then(
  user=> {
    if(!user) return res.status(400).json({msg: "User not found"});
    bcrypt.compare(req.body.password,user.password, (err,data)=> {
      console.log("data = "+req.body.password+", database pass = "+user.password)

      if(err) {
        next(err);
     }

     if(data) {
      const token = jwt.sign({id : user._id},req.app.get("secretKey"),{expiresIn:'24h'});
      res.json({status:"succes",message:"User Found",data: {user:user,token:token}})
    }else {
      res.json({status:"failed",message:"invalid credentials",data:null})

    }

      })
    });

  }

  
/****************** Get all user *****************/
exports.getAllUsers = async function(req, res, next) {
  
  try {
    const usersList =await User.find({});

    res.status(200).json({sucess: "OK",data: usersList});
  }catch(error) {
    next(error)
  }


};

/****************** Get user by id*****************/

exports.getUserbyId = async function  (req,res,next ){

  try {
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findById(userId);

    if(!user) {
      res.status(404).json({failed: "Not Ok",message:"User not found please try again "});
    }
    res.status(200).json({sucess: "OK",data: user});


  }catch(error) {
    next(error)
  }
}
/****************** Update user*****************/
exports.updateUser = async function(req  ,res, next) {


  try {
    const userId = req.params.userId;
    const newDataUser  = req.body ;
    await User.findByIdAndUpdate(userId, newDataUser);
    const UserAfterUpdate = await  User.findById(userId);
    res.status(200).json({sucess: "OK",data: UserAfterUpdate,message :"User has been updated !!"});



  }catch(error) {
    next(error);
  
  
  }
}
/****************** Delete user*****************/

exports.deleteUser = async function (req ,res ,next) {
    const userId = req.params.userId;

    user = await User.findById(userId)

        
    if(!user) {
      return   res.status(404).json({failed: "Not Ok",message:"User not found please try again "});

    }
    
else {
  await User.findByIdAndRemove(userId)
   Department.updateOne(       { user: user._id }, 
    { $pull: { user: user._id } }, 
    { multi: true }, 
    next);
      


  return   res.status(200).json({sucess: "OK",data: null, message: "user has been deleted !!"});

}
}

/****************** Get user by name*****************/
exports.getUserByFirstName = async function(req ,res ,next) { 
  


  try {
    const firstName = req.params.firstName;
    console.log(firstName);
    const user = await User.find({firstName});

    if(!user) {
      res.status(404).json({failed: "Not Ok",message:"User not found please try again "});
    }
    res.status(200).json({sucess: "OK",data: user});


  }catch(error) {
    next(error)
  }
}


//GET IMAGE 
/*
Avec Arrow function
exports.getImag = async(req,res,nex)=> {

}
*/
exports.getImage = async function(req,res,next) {
  res.sendFile(__dirname+'/uploads/images/'+req.params.image)
}





/*****Grant Access *** */
exports.grantAccess = function(action , ressource) {

  return  async (req, res , next) => {
    try {

      const permission  =roles.can(req.user.role)[action](ressource);
      if(!permission.granted) {
          res.status(401).json({message : "You don't have enough permission to perform this action"});

      }
      next()
    }catch(eror) {
      next(eror);
    }
  }
}

exports.allowIfLoggedIn = async function(req , res , next)  {
  try {
    const user = res.locals.loggedInUser;
    console.log("user current ="+user);
    if(!user) {
      return res.status(401).json({message: "You need to be logged in to access this route"})
    }
    req.user = user;//get user connect
    next();
  }catch(err) {
    next(err);
  }
}