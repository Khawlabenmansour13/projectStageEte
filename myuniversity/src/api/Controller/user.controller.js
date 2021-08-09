
const User =  require('../Model/user.model');
const Department =  require('../Model/department.model');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var  fs = require('fs');
const multer = require('multer')

const {roles} = require('../../_helper/roles');


//path to render from file  to another
path = require('path');
 

//async : multiple functions on series
async = require('async');
// get crypto lib
const crypto = require('crypto');


//Mail configuration 


var hbs = require('nodemailer-express-handlebars');


email =  process.env.MAILER_EMAIL || 'khaok6749@gmail.com'
pass = process.env.MAILER_PASS || 'aziz123456789pqt'
nodemailer = require('nodemailer')



var smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: 'khaok6749@gmail.com', //Remove '@gmail.com' from your username.
    pass: 'aziz123456789pqt'
  }
});

exports.render_reset_password = function (req,res,next) {
  return  res.sendFile(path.resolve('./src/api/template/Home/reset_password.html'));
}
exports.render_forget_password = function (req,res,next) {
  return  res.sendFile(path.resolve('./src/api/template/Home/forgot_password.html'));
}



var handlebarsOptions = {

  viewEngine: 'handlebars',
//configure url route  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/api/template/'),
  defaultLayout:'template',

  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));


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
exports.forgetPassword =  function (req, res , next) {
  async.waterfall(
    [

      //****Find User by email * */
      //**done == callback ya3ni data bch test3mlha fi function lyba3d fucntion ely enti fiha  */
      function(done) {
        console.log("hello I am here in forgetPassword function")

        User.findOne({
          email: req.body.email
        }).exec(function(err,user) {
          if(user) 
            done(err,user)
            else
            done('user not found .')
        })
      },
      //**Create and generate Token  */
      function(user,done) {
        //create the random token 
        crypto.randomBytes(20, function(err,buffer ) {
          var token = buffer.toString('hex');
          done(err,user,token)
        })
      },

      //find user and update property reset_passowrd_token with token and reset_password_expires with 24 hours (86400000)
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, 
          { reset_password_token: token, reset_password_expires: Date.now() + 86400000 },
           { upsert: true, new: true }).exec(function(err, new_user) {

            console.log("new_user="+new_user)
                      done(err, token, new_user);
        });
      },
      function(done,user,new_user) {
        var emailUser = user.email;

        console.log("from  who email =="+email)
        var data  = {
          to : emailUser,
          from: email,
          subject:'Password help !!!!',
          template:'forgot_password',
          context: {
            url: 'http://localhost:8000/user/reset_password?token=' + user.reset_password_token,
            name: user.firstName
          }
        };
  
  

      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
          return done(err);
        }
      });
    }
  ], function(err) {
    return res.status(422).json({ message: err });
  });
}

/**
 * Reset passowrd
 */

exports.resetPassword = async function(req,res,next) {
  console.log("user reset token value = "+req.body.token);
  User.findOne({
    reset_password_token : req.body.token,
    reset_password_expires: {
      $gt:  Date.now()
    }
  }).exec(function(err,user) {

    if (!err && user) {

      if(req.body.newPassword === req.body.verifyPassword) {

        user.password  =  req.body.newPassword;
                user.reset_password_expires = undefined;
        user.reset_password_token = undefined;


        user.save(function(err) {
          if(err) {
            console.log("err au nivezau de reset password=="+err);
          }
          else {
              emailUser = user.email;
            var data = {
              to : emailUser,
              from: email,
              subject:'Password Reset Confirmation !!!!',
              template:'reset_password',
              context: {
                name: user.firstName.split(' ')[0]
              }
            };
            smtpTransport.sendMail(data, function(err){

              if(!err) {return res.json({message:'Password reset'})}
              else {
                return done(err)
              }
            });
          
          }
        })
      } else {


        alert("Password does not matche");
      }




    }

else {
  return res.json({message:"Token invalid or has expired"})
}

  })
}