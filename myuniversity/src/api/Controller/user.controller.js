
const User =  require('../Model/user.model');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/******************Sign UP**************** */
exports.signUp = function(req,res,next) {


  
    let user = new User ({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        country : req.body.country
    })

    user.save(function(err) {
        if(err) 
          {
            return next(err) 
          } 
          res.json({sucess:"User created successfully!!"})
    })              
}



/******************Sign In**************** */

exports.signIn = function(req,res,next) {

  User.findOne({
   
     $and: [ 
      { email: req.body.email.toLowerCase() }, 
      { password: req.body.password } 
    ] }
,function(err,user) {

  if(err) {
     next(err);
  }
  else if(user != null) {

    console.log(req.body.password+","+ user.password)
    if(bcrypt.compare(req.body.password,user.password)) {

      const token = jwt.sign({id : user._id},req.app.get("secretKey"),{expiresIn:'24h'});
      res.json({status:"succes",message:"User Found",data: {user:user,token:token}})

    }
  

  }else {
    res.json({status:"failed",message:"invalid email/pwd",data:null})

  }
})};