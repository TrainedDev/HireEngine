import { Router } from "express";
import { verifyUser, verifyUserRole } from "../middleware/verifyAuth.js";
import {
  candidateApplyingJobs,
  getCandidateAppliedJobs,
  getRecruiterAppliedJobs,
} from "../controllers/appliedJob.controllers.js";
import { asyncHandler } from "../utils/handler.utils.js";

const router = Router();

router.post(
  "/candidate-jobs/:id",
  verifyUser,
  asyncHandler(candidateApplyingJobs),
);

router.get(
  "/candidate-jobs",
  verifyUser,
  asyncHandler(getCandidateAppliedJobs),
);

router.get(
  "/recruiter-jobs",
  verifyUser,
  verifyUserRole,
  asyncHandler(getRecruiterAppliedJobs),
);

export default router;
