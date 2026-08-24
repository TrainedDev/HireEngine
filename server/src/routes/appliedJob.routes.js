import { Router } from "express";
import { verifyUser, verifyUserRole } from "../middleware/verifyAuth";
import {
  candidateApplyingJobs,
  getCandidateAppliedJobs,
  getRecruiterAppliedJobs,
} from "../controllers/appliedJob.controllers";

const router = Router();

router
  .post("/candidate-job/:id", verifyUser, asyncHandler(candidateApplyingJobs))
  .get(verifyUser, getCandidateAppliedJobs)
  .get(verifyUser, verifyUserRole, getRecruiterAppliedJobs);

export default router;
