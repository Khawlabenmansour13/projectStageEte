const express = require("express");
const { getnotification,addnotification,deletenotification,updatenotification,getAdminnotifications } = require("../Controller/notificiation.controller");
const router = express.Router();


//GET ALL NOTIFICATION By UESER
router.get('/:id',getnotification);

//ADD NEW NOTIFICATION
router.post('/add',addnotification);
//PUT  NOTIFICATION
router.put('/update/:id',updatenotification);
//Delete  NOTIFICATION
router.delete('/delete/:id',deletenotification);
router.get('/notificationsAdmin/:id',getAdminnotifications);


module.exports = router;
