
const User =  require('../Model/user.model');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {roles} = require('../../_helper/roles');

/******************Sign UP**************** */
exports.signUp = function(req,res,next) {


  
    let user = new User ({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        country : req.body.country,
        role : req.body.role
    })

    user.save(function(err) {
        if(err) 
          {
            return next(err) 
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
  try {
    const userId = req.params.userId;
    const user= await User.findById(userId);
    if(!user) {
      res.status(404).json({failed: "Not Ok",message:"User not found please try again "});

    }
     await User.findByIdAndDelete(userId);

    res.status(200).json({sucess: "OK",data: null, message: "user has been deleted !!"});
  }catch(error) {
    next(error)
  }
}


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
    req.user = user;
    next();
  }catch(err) {
    next(err);
  }
  
}