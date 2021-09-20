const express = require('express');
const router = express.Router();


const claim_controller = require('../Controller/claim.controller')
router.post('/sendClaim',claim_controller.addClaim);
router.get('/myClaims/:id',claim_controller.myClaim);
router.get('/claims',claim_controller.claims);
router.put('/pending/:id',claim_controller.traiterReclamation);
router.put('/reject/:id',claim_controller.rejectReclamation);

module.exports = router;
