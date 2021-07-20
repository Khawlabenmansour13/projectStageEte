const express = require('express');

const router = express.Router();


const user_controller = require('../Controller/user.controller');


router.post('/register',user_controller.signUp)
 


router.get('/login',user_controller.signIn)
router.get('/getAllUsers',user_controller.allowIfLoggedIn,user_controller.grantAccess('readAny','profile'),user_controller.getAllUsers);
router.get('/getUserById/:userId',user_controller.getUserbyId)
router.get('/getUserByFirstName/:firstName',user_controller.getUserByFirstName)
router.put('/updateUser/:userId',user_controller.updateUser)
router.get('/getUserByFirstName/:firstName',user_controller.getUserByFirstName)
router.delete('/deleteUser/:userId',user_controller.deleteUser)


module.exports = router;