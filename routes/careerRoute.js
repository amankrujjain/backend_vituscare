const express = require("express")
const {jobPostValidator, jobPostUpdateValidation} = require("../helper/validator");
const {createJob,activateJobPost, getAllJobs, getSingleJob, updateJobPost, deleteJobPost} = require("../controller/controller");

const router = express.Router();

router.post("/create-job-post", jobPostValidator , createJob );
router.get("/get-all-jobs", getAllJobs);
router.put("/activate-job-post/:id/activate", activateJobPost);
router.get("/job/:id/title/:job_title/location/:job_location(*)", getSingleJob);
router.put("/update-job-post/:id",jobPostUpdateValidation, updateJobPost);
router.delete("/delete-job-post/:id", deleteJobPost);

module.exports = router;
