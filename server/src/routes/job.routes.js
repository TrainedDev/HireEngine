import { Router } from "express";
import { verifyUser, verifyUserRole } from "../middleware/verifyAuth.js";
import {
  createJob,
  getAllJobs,
  getJob,
  getRecruiterJobs,
  updateCandidateJobStatus,
} from "../controllers/job.controllers.js";
import { asyncHandler } from "../utils/handler.utils.js";

const router = Router();

router.post("/create", verifyUser, verifyUserRole, asyncHandler(createJob));

router
  .route("/candidate/:id")
  .get(asyncHandler(getJob))
  .patch(verifyUser, verifyUserRole, asyncHandler(updateCandidateJobStatus));

router.get("/candidate-jobs", asyncHandler(getAllJobs));

router.get(
  "/recruiter-jobs",
  verifyUser,
  verifyUserRole,
  asyncHandler(getRecruiterJobs),
);

export default router;
