
const SchedulerModel = require("../Model/schedule.model.js");
const Department = require("../Model/department.model");

module.exports = {
    getScheduler: async (req, res) => {
        try {
            res
                .status(200)
                .json(
                    await SchedulerModel.find({}).populate("postOwner")
                );
        } catch (error) {
            res.status(404).json({ statue: false, message: error.message });
        }
    },
    addScheduler: async (req, res) => {
        const newScheduler = new SchedulerModel(req.body);
        SchedulerModel.find({ Id: { $gt: 0 } }).sort({ Id: -1 })
            .then(([first, ...others]) => {
                if (first)
                    counter = first.Id + 1;
            });
        let schedule  = new SchedulerModel ({


            Subject: req.body.Subject,
            StartTime: req.body.StartTime,
            EndTime: req.body.EndTime,
            RecurrenceRule:req.body.RecurrenceRule



        })

        try {
            const data = await schedule.save();
            res.status(201).json({
                statue: true,
                message: "Scheduler Added Succefully",
                result: data,
            });
        } catch (error) {
            res.status(400).json({ statue: false, message: error.message });
        }
    },
    updateScheduler: async (req, res) => {
        try {
            const scheduleId = req.params.id;
            const newSchedule  = req.body ;
            after =await SchedulerModel.findByIdAndUpdate(scheduleId, newSchedule);

          //  const after = await  SchedulerModel.findById(scheduleId);
            console.log(JSON.stringify("data="+JSON.stringify(after)))
            res.json({sucess: "OK",data: after,message :"Schedule has been updated !"});



        }catch(error) {
            console.log("ERROR="+error)


        }
    },

    deleteScheduler: async (req, res) => {
        try {
            const data = await SchedulerModel.findByIdAndRemove(req.params.id);
            res.status(201).json({
                statue: true,
                message: "Scheduler Deleted Succefully",
                result: data,
            });
        } catch (error) {
            res.status(400).json({ statue: false, message: error.message });
        }
    },
    deleteAllScheduler: async (req, res) => {
        try {
            const data = await SchedulerModel.remove({});
            res.status(201).json({
                statue: true,
                message: "Scheduler Deleted Succefully",
                result: data,
            });
        } catch (error) {
            res.status(400).json({ statue: false, message: error.message });
        }
    },
};
