const express = require('express');

const router = express.Router();


const user_controller = require('../Controller/user.controller');


router.post('/register',user_controller.signUp)


router.get('/login',user_controller.signIn)


module.exports = router;