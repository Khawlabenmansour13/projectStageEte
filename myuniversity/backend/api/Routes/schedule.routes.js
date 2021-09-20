const express = require("express");
const router = express.Router();
const {
    getScheduler,
    addScheduler,
    updateScheduler,
    deleteScheduler,
    deleteAllScheduler,
} = require("../Controller/schedule.controller.js");
router.post("/get", getScheduler);
router.post("/", addScheduler);
router.put("/:id", updateScheduler);
router.delete("/:id", deleteScheduler);
router.delete("/", deleteAllScheduler);
module.exports = router;
