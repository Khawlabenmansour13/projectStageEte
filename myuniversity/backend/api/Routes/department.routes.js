const express = require('express');

const router = express.Router();

const department_controller = require('../Controller/department.controller');
const user_controller = require('../Controller/user.controller');


router.post('/addDepartment',user_controller.allowIfLoggedIn,department_controller.addDepartment)
 


router.get('/getAllDepartment',user_controller.allowIfLoggedIn,user_controller.grantAccess('readAny','profile'),department_controller.getAllDepartment);
router.get('/getDepartmentById/:departmentId',user_controller.allowIfLoggedIn,department_controller.getDepartmentbyId)
router.get('/getDepartmentByName/:name',user_controller.allowIfLoggedIn,department_controller.getDepartmentByName)
router.put('/updateDepartment/:departmentId',user_controller.allowIfLoggedIn,department_controller.updateDepartment)
router.delete('/deleteDepartment/:departmentId',user_controller.allowIfLoggedIn,department_controller.deleteDepartment)
router.put('/affectUserDepartement/:departmentId/:userId',user_controller.allowIfLoggedIn,department_controller.affectUserDepartement)


module.exports = router;