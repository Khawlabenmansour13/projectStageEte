

const User =  require('../Model/user.model');
const Department =  require('../Model/department.model');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var  fs = require('fs');
var perf = require('execution-time')
const multer = require('multer')

const {roles} = require('../_helper/roles');


//Require lib google authentification
const {OAuth2Client} = require('google-auth-library')
const authClient = new OAuth2Client("380442105620-0chtnak9igr6tcs8fskt396jpqshpg78.apps.googleusercontent.com");

// const fetch = require('node-fetch');
//path to render from file  to another
path = require('path');



//async : multiple functions on series
async = require('async');
// get crypto lib
const crypto = require('crypto');




//Mail configuration
email =  process.env.MAILER_EMAIL || 'khaok6749@gmail.com' ;
pass = process.env.MAILER_PASS  || 'aziz123456789pqt';
nodemailer = require('nodemailer')

//MAIL CONFIG


var smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'khaok6749@gmail.com', //Remove '@gmail.com' from your username.
    pass: 'aziz123456789pqt'
  }
});



/*
exports.render_reset_password = function (req,res,next) {
  return  res.sendFile(path.resolve('./src/api/template/Home/reset_password.html'));
}
*/
/*
exports.render_forget_password = function (req,res,next) {
  return  res.sendFile(path.resolve('./src/api/template/Home/forgot_password.html'));
}
*/


/*
var handlebarsOptions = {

  viewEngine: 'handlebars',
//configure url route  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/api/template/'),
  defaultLayout:'template',

  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));
*/

/******************Sign UP**************** */
exports.signUp = function(req,res,next) {


  //VALIDATION SUBMITION FORM
  if(!req.body.firstName) {
    res.json({success: false, message:"You must provide firstName!!"});
  }
  else
  if(!req.body.lastName) {
    res.json({success: false, message:"You must provide lastName!!"});
  }

  else
  if(!req.body.email) {
    res.json({success: false, message:"You must provide email!!"});
  }
  else
  if (!req.body.password) {
    res.json({success: false, message:"You must provide password!!"});

  }
  else
  if (!req.body.confirmPassword) {
    res.json({success: false, message:"You must provide confirmPassword!!"});

  }
  else
  if(!req.body.phone) {
    res.json({success: false, message:"You must provide phone !!"});
  }
  else
  if(!req.body.role) {
    res.json({success: false, message:"You must provide role !!"});
  }
  else
  if(!req.body.country) {
    res.json({success: false, message:"You must provide country !!"});
  }




  else
  if(req.file === undefined) {

        console.log("REQ FILE =="+req.file);
    return res.json({success: false, message:"image required"});

  }


  else {

    let user = new User({

      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      phone: req.body.phone,
      country: req.body.country,
      role: req.body.role,
      image: req.file.originalname,

    })

    user.save(function (err) {

      console.log(req.body.confirmPassword)
      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        return res.json({success: false, message: "Password do not match !"});

      }

      if (err) {
        if (err.code == 11000) {
          return res.json({success: false, message: "E-mail already exists !"});

        } else {
          if (err.errors) {
            if (err.errors.email) {
              return res.json({success: false, message: err.errors.email.message});
            } else {
              if (err.errors.firstName) {
                return res.json({success: false, message: err.errors.firstName.message});

              } else {
                if (err.errors.lastName) {
                  return res.json({success: false, message: err.errors.lastName.message});

                } else {
                  if (err.errors.password) {
                    return res.json({success: false, message: err.errors.password.message});

                  } else {
                    if (err.errors.phone) {
                      return res.json({success: false, message: err.errors.phone.message});

                    }
                  }

                }
              }
            }


          } else {
            return res.json({success: false, message: "could not save user eroror "});

          }
        }

      }
    });


    const emailUser = user.email;

    User.findOne({
      emailUser,
    }).exec((err, user) => {
      if (user) {
        return res.json({success: false, message: err.errors.emailUser.message});

      }
    });

    //UPLOAD IMAGE
    var file = __dirname + '/uploads/images' + req.file.originalname;
    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
        if (err) {
          console.error(err);
          var response = {
            message: 'Sorry, file couldn\'t be uploaded.',
            filename: req.file.originalname
          };

          res.json(response);
        } else {
          var response = {
            message: 'File uploaded successfully',
            filename: req.file.originalname
          }
        }
      })
    })


    const {firstName, email, password, lastName, country, phone, role, confirmPassword} = req.body;


    const image = user.image
    const token = jwt.sign(
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          phone,
          country,
          role,
          image,
        },
        process.env.JWT_ACCOUNT_ACTIVATE,
        {
          expiresIn: "20m",
        }
    );

    var data = {
      from: email,
      to: emailUser,
      subject: "Account activation link",

      html: ' <h3>Please <span style="color:red;">' + firstName + '</span> use the following to activate your account</h3><br>Please click on given link to activate your account,please check this link<p>' + process.env.CLIENT_URL + '/activate/' + token + '</p><hr/><p>This email may containe sensetive information</p><p>' + process.env.CLIENT_URL + '</p>'

    };


    smtpTransport.sendMail(data, function (err) {
          if (!err) {
            return res.json({mailSend: "ok", message: `Nice Email has been sent to ${emailUser}`});
          } else {
            console.log("RECPIENT==" + JSON.stringify(err))
            return next(err);
          }
        }
    )
  }
}



/****************ACTIVATION EMAIL*********/


exports.activate = (req, res,err) => {


  const {token} = req.body;

  console.log("accesstoken TOKENNN="+JSON.stringify(token["role"]))
  if (token) {
    jwt.verify(token["token"], process.env.JWT_ACCOUNT_ACTIVATE, (err, decoded) => {
      if (err) {
        return res.json({
          error:"TokenError",
          message: err
        });
      } else {


        console.log("Confirm++++"+token['confirmPassword']);
        const user = new User({
          firstName: token["firstName"],
          lastName:token["lastName"],
          email:token["email"],
          password:token["password"],
          confirmPassword:token["confirmPassword"],
          phone:token["phone"],
          country:token["country"],
          role:token["role"],
          image:token["image"],
          accesstoken:token["token"]

        });

        console.log("USER ="+user);

        user.save(function (err) {
          if(err) {

            return res.json({success:false,errors:err})

          }
          else {
            return res.json({sucess:true,message:"Your account created successfully!!" , data: user})

          }
        });
      }
    });
  } else {
      return res.json({success: false, message: "error happening !!!!!!"+err});
  }
};



/******************Sign In**************** */

exports.signIn =  function(req,res,next) {

  let {email,password } = req.body;



  // check if user exist

  User.findOne({
    email,
  }).exec((err, user) => {
    if (err || !user) {
      return res.json({
        message: "user not found please sign up",
      });
    }


    //Check passwowrd

    bcrypt.compare(password,user.password).then(isMatch=> {
      if(isMatch) {

        const {id , email ,image, role,firstName,lastName} = user;
        const payload =  {id , email ,image, role,firstName,lastName};

        //SignToken
        jwt.sign(payload,req.app.get("secretKey"),{expiresIn:'24h'},
            (err,token)  => {
              return res.json(
                  {
                    success:true,
                    user:payload,
                    token:token,
                  }
              )
            }
        );

      } else {
        return res.json({message: "password invalid"});
      }
    })
  })

}


/****************GET ALL users with role teacher*********/

exports.getTeachers = function(req, res,next) {

  let teachers=[];

  User.find()
      .then((data) => {
        for(var i = 0 ; i < data.length; i ++) {
          if(data[i].role === "TEACHER") {
            console.log("DATA ROLE="+data[i].role)
            teachers.push(data[i]);
            console.log("TEACHERS =="+data[i]);
            return res.json(teachers);
          }
        }
        return res.json({data:null});
      })
      .catch((e) => {
        console.log(e);
      });

}




/****************GET ALL users with role Employee*********/

exports.getEmployees = function(req, res,next) {

  let employees=[];

  User.find()
      .then((data) => {
        for(var i = 0 ; i < data.length; i ++) {
          if(data[i].role === "EMPLOYEE") {
            console.log("DATA ROLE="+data[i].role)
            employees.push(data[i]);
            console.log("employees =="+data[i]);
            return res.json(employees);
          }
        }
        return res.json({data:null});
      })
      .catch((e) => {
        console.log(e);
      });

}



//UPLOAD MULTER CONFIG
// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 300 * 1024 * 1024, // limiting files size to 5 MB
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

/*************Upload image******************/

exports.uploadImageProfile= function(req,res) {

  //UPLOAD IMAGE
  var file = __dirname + '/uploads/images' + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err) {
        console.error(err);
        var response = {
          message: 'Sorry, file couldn\'t be uploaded.',
          filename: req.file.originalname
        };

        res.json(response);
      } else {
        var response = {
          message: 'File uploaded successfully',
          filename: req.file.originalname
        }
      }
    })
  })



  //UPLOAD IMAGE

  const imageProfile = req.file.originalname;

  User.findOneAndUpdate(req.body._id, {$set: {image: "images"+imageProfile}}, {new: true},
      (err, result) => {
        if (err) {
          return res.status(422).json({error: "pic canot post" + err})
        }
        res.json(result)
      })



};

/***********Update Profile*****************/

exports.updateProfileController = (req, res) => {





 let updatedProfile;
  if(req.file ){
     updatedProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.file.originalname,
      country: req.body.country,
      phone:req.body.phone,



    };
  }


  else {
     updatedProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      phone:req.body.phone,



    };
  }
  console.log("UPDATE="+JSON.stringify(updatedProfile));

  User.findOneAndUpdate({ _id: req.params.id }, updatedProfile, {}).then(
      (oldResult) => {
        console.log("true");
        User.findOne({ _id: req.params.id })
            .then((result) => {
              console.log("this is result " + result);
              res.json({
                success: true,
                msg: `Successfully updated!`,
                result: {
                  _id: result._id,
                  firstName: result.firstName,
                  lastName: result.lastName,


                  image: result.image,
                  country:result.country
                  ,
                  phone:result.phone,

                  role: result.role,
                  salt: result.salt,
                  email: result.email,
                },
              });
            })

            .catch((err) => {
             return  res
                  .json({ success: false, msg: `Something went wrong. ${err}` });
            });
      }
  );
};













/****************** Get all user *****************/
exports.getAllUsers = async function(req, res, next) {

User.find()
      .then((data) => {
        res.json(data);
      })
      .catch((e) => {
        console.log(e);
      });

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
    res.json({success: "OK",data: user});


  }catch(error) {
    next(error)
  }
}
/********************GET ID USER BYEMAIL************/

exports.getIdUserByEmail = async function  (req,res,next ){

  try {
    const email = req.params.email;
    console.log(email);

    const user = await User.findOne({email});




    if(user) {
      res.json(user._id);

    }
    else {
      res.json({failed: "Not Ok",message:"User Email not found please try again "});

    }


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
    res.json({sucess: "OK",data: UserAfterUpdate,message :"Profile has been updated !!"});



  }catch(error) {
    next(error);


  }
}
/****************** Delete user*****************/

exports.deleteUser = async function (req ,res ,next) {
  const id = req.params.id;

  user = await User.findById(id)


  if(!user) {
    return   res.status(404).json({failed: "Not Ok",message:"User not found please try again "});

  }

  else {
    await User.findByIdAndRemove(id)
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
  console.log();

  var path = require('path');
  var filePath = __dirname+'/uploads/'+req.params.image
  var resolvedPath = path.resolve(filePath);
  console.log("PATH="+resolvedPath);
  return res.sendFile((path.join(resolvedPath)));
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
      return res.json({message: "You need to be logged in to access this route"})
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
            subject:'Password Reset',
            html:' <h3>Hello '+user.firstName+'</h3><br><hr/>You requested for password reset,please check this link <a href="http://localhost:3000/resetPassword?token=' + user.reset_password_token + '">here</a>'

          };



          smtpTransport.sendMail(data, function(err) {
            if (!err) {
              return res.json({ message: 'Kindly check your email for further instructions' });
            } else {
              return next(err);
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

    console.log("resultt===>"+user);
    if (!err && user) {
      console.log("NEw password is ="+req.body.newPassword)
      console.log("confirmPassword password is ="+req.body.confirmPassword)

      if(req.body.newPassword) {

        user.password  =  req.body.newPassword;
        user.confirmPassword =  req.body.newPassword;
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
              subject:'Password Reset Confirmation ',
              html:' <h3>Hello again '+user.firstName+'</h3><br><p>You password has been changed successfully!!</a>'

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


        return res.json({message:"Password does not matche"});
      }




    }

    else {
      return res.json({message:"Token invalid or has expired"})
    }

  })
}


//Google authentification

exports.googleAuthentification = (req, res) => {


  const {idToken} = req.body;
  authClient
      .verifyIdToken({
        idToken,
        audience:"380442105620-0chtnak9igr6tcs8fskt396jpqshpg78.apps.googleusercontent.com"})
      .then((response) => {

        const { email_verified, name, email, picture } = response.payload;
        console.log("PAYLOAD ===>"+JSON.stringify((response.payload)))
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              const token = jwt.sign({ _id: user._id }, req.app.get("secretKey"), {
                expiresIn: "7d",
              });
              const { _id, email, name, role, picture } = user;
              console.log(JSON.stringify(user));

              console.log(JSON.stringify(token));
              return res.json({
                token,
                user: { _id, email, name, role, picture },
              });
            } else {
              let password = email  +req.app.get("secretKey");
              user = new User({ name, email, password, picture });
              user.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "Something went wrong!!!!",
                  });
                }
                const token = jwt.sign(
                    { _id: data._id },
                    req.app.get("secretKey"),
                    { expiresIn: "7d" }
                );
                const { _id, email, name, role, picture } = data;
                return res.json({
                  token,
                  user: { _id, email, name, role, picture },
                });
              });
            }
          });
        } else {
          return res.status(400).json({
            error: "Google login failed. Try again",
          });
        }
      });
};

//COUNT TEACHER

exports.countTeacher = async function (req,res) {

  var i =0;

     User.findOne().exec(function(err,item) {

       if(item.role ==="TEACHER") {
         i++;
       }
       return res.json(i)

     })


  }
//COUNT STUDENT

exports.countSTUDENT = async function (req,res) {

  var i =0;

  User.findOne().exec(function(err,item) {

    if(item.role ==="STUDENT") {
      i++;
    }
    return res.json(i)

  })


}
//COUNT EMPLOYEE

exports.countEmployee = async function (req,res) {

  var i =0;

  User.findOne().exec(function(err,item) {

    if(item.role ==="EMPLOYEE") {
      i++;
    }
    return res.json(i)

  })


}

// // Facebook authentification
// exports.facebookAuthentification = (req, res) => {
//   console.log("FACEBOOK LOGIN REQ BODY", req.body);
//   const { userID, accessToken } = req.body;
//
//   const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,picture,email&access_token=${accessToken}`;
//
//   return (
//       fetch(url, {
//         method: "GET",
//       })
//           .then((response) => response.json())
//           // .then(response => console.log(response))
//           .then((response) => {
//             const { email, name, picture } = response;
//             User.findOne({ email }).exec((err, user) => {
//               if (user) {
//                 const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//                   expiresIn: "7d",
//                 });
//                 const { _id, email, name, role, picture } = user;
//                 console.log(res);
//                 return res.json({
//                   token,
//                   user: { _id, email, name, role, picture },
//                 });
//               } else {
//                 let password = email + process.env.JWT_SECRET;
//                 user = new User({ name, email, password });
//                 user.save((err, data) => {
//                   if (err) {
//                     console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
//                     return res.status(400).json({
//                       error: "User signup failed with facebook",
//                     });
//                   }
//                   const token = jwt.sign(
//                       { _id: data._id },
//                       process.env.JWT_SECRET,
//                       { expiresIn: "7d" }
//                   );
//                   const { _id, email, name, role, picture } = data;
//                   return res.json({
//                     token,
//                     user: { _id, email, name, role, picture },
//                   });
//                 });
//               }
//             });
//           })
//           .catch((error) => {
//             res.json({
//               error: "Facebook login failed. Try later",
//             });
//           })
//   );
// };
