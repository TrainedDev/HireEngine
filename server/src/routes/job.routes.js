import { Router } from "express";
import { verifyUser, verifyUserRole } from "../middleware/verifyAuth";
import {
  createJob,
  getAllJobs,
  getJob,
  getRecruiterJobs,
  updateCandidateJobStatus,
} from "../controllers/job.controllers";

const router = Router();

router.post("/create-job", verifyUser, verifyUserRole, asyncHandler(createJob));
router
  .get("/job/:id", asyncHandler(getJob))
  .patch(verifyUser, verifyUserRole, updateCandidateJobStatus);
router
  .get("/jobs", asyncHandler(getAllJobs))
  .get(verifyUser, verifyUserRole, asyncHandler(getRecruiterJobs));

export default router;
