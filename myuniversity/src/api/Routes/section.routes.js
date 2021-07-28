const express = require('express');

const router = express.Router();


const section_controller = require('../Controller/section.controller');
const user_controller = require('../Controller/user.controller');


router.post('/addSection',section_controller.addSection);
router.put('/affecterUserToSection/:sectionId/:userId',section_controller.addUsersToSection)
router.put('/getSectionbyEmailUser/:email',section_controller.getSectionbyEmailUser)



module.exports = router;