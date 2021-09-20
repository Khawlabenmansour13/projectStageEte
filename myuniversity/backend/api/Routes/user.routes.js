const express = require('express');

const router = express.Router();

const RateLimit = require("express-rate-limit");


const user_controller = require('../Controller/user.controller');

const User = require('../Model/user.model')
//updload directroy file image 
const multer = require('multer');
const {uploadImage} = require("../Controller/user.controller");
const fs = require("fs");
const upload = multer({dest: __dirname + '/uploads/images'});

//Router
router.post('/register',upload.single('image'),user_controller.signUp)
router.post("/activate",upload.single('image'), user_controller.activate);

router.post('/login',user_controller.signIn)
router.get('/getAllUsers',user_controller.getAllUsers);
router.get('/getUserById/:userId',user_controller.getUserbyId)
router.get('/getUserByFirstName/:firstName',user_controller.getUserByFirstName)
router.put('/updateUser/:userId',user_controller.updateUser)
router.get('/getUserByFirstName/:firstName',user_controller.getUserByFirstName)
router.delete('/deleteUser/:id',user_controller.deleteUser)
router.get('/getImage/:image',user_controller.getImage)
router.get('/findIdUserByEmail/:email',user_controller.getIdUserByEmail);
router.get('/getTeachers',user_controller.getTeachers);
router.get('/getEmployees',user_controller.getEmployees);

router.put('/updateProfile/:id',upload.single('image'),user_controller.updateProfileController);



router.route('/forgot_password').post(user_controller.forgetPassword)
router.route('/reset_password').post(user_controller.resetPassword)




// Google and Facebook Login
router.post("/loginGoogle", user_controller.googleAuthentification);
// router.post("/loginFacebook", user_controller.facebookAuthentification);





router.put(
"/uploadProfilePicture",upload.single("image"),user_controller.uploadImageProfile);


//COUNT

router.get('/countTeacher',user_controller.countTeacher)
router.get('/countStudent',user_controller.countSTUDENT)
router.get('/countEmployee',user_controller.countEmployee)

module.exports = router;
