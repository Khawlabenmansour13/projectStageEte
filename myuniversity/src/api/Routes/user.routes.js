const express = require('express');

const router = express.Router();


const user_controller = require('../Controller/user.controller');


//updload directroy file image 
const multer = require('multer');
const upload = multer({dest: __dirname+'/uploads/images'})

//Router
router.post('/register',upload.single('image'),user_controller.signUp)
router.get('/login',user_controller.signIn)
router.get('/getAllUsers',user_controller.allowIfLoggedIn,user_controller.grantAccess('readAny','profile'),user_controller.getAllUsers);
router.get('/getUserById/:userId',user_controller.getUserbyId)
router.get('/getUserByFirstName/:firstName',user_controller.getUserByFirstName)
router.put('/updateUser/:userId',user_controller.updateUser)
router.get('/getUserByFirstName/:firstName',user_controller.getUserByFirstName)
router.delete('/deleteUser/:userId',user_controller.deleteUser)
router.get('/getImage/:image',user_controller.getImage)



router.route('/forgot_password').get(user_controller.render_forget_password).post(user_controller.forgetPassword)
router.route('/reset_password').get(user_controller.render_reset_password).post(user_controller.resetPassword)

module.exports = router;