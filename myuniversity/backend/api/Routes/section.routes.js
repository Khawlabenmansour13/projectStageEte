const express = require('express');
const router = express.Router();

const section_controller = require('../Controller/section.controller');
const user_controller = require('../Controller/user.controller');


router.post('/addSection',section_controller.addSection);
router.put('/affecterUserToSection/:sectionId/:userId',section_controller.addUsersToSection)
router.get('/getUsersSectionByTitle/:title',section_controller.getUsersSectionByTitle)
router.get('/getAllsections',section_controller.getAllsections)
router.get('/getSectionById/:sectionId',section_controller.getSectionbyId)
router.put('/updateSection/:sectionId',section_controller.updateSection)
router.delete('/deleteSection/:sectionId',section_controller.deleteSection)
router.get('/ComputerScience',section_controller.getSectionComputerScience)
router.get('/Mecanic',section_controller.getSectionMecanic)
router.get('/Business',section_controller.getSectionBusiness)
router.get('/Civilize',section_controller.getSectionCivilize)
router.get('/Continu',section_controller.getSectionContinu)





module.exports = router;