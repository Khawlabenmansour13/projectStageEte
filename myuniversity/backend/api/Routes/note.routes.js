const express = require('express');
const router = express.Router();

const note_controller = require ('../Controller/note.controller')

router.post('/addMark',note_controller.addMark);
router.get('/marks',note_controller.getAllMarks);

router.post('/noteUser',note_controller.getNoteByUser);

router.get('/search',note_controller.search);
router.get('/deleteMark/:id',note_controller.deleteNote);

router.get('/getNoteById/:id',note_controller.getNoteById);
router.put('/updateNote/:id',note_controller.updateNote);



module.exports = router;
