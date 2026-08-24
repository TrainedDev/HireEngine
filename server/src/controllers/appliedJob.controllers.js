import {
  candidateApplyInJobsService,
  getCandidateAppliedJobsService,
  getRecruiterAppliedJobsService,
} from "../services/appliedJobController.services.js";
import { appError } from "../utils/appError.utils.js";
import { responseUser } from "../utils/responseUser.utils.js";


export const getRecruiterAppliedJobs = async (req, res) => {
  const recruiterId = req.userId;

  const response = await getRecruiterAppliedJobsService(recruiterId);

  responseUser(res, 200, response);
};

export const getCandidateAppliedJobs = async (req, res) => {
  const candidateId = req.userId;

  const response = await getCandidateAppliedJobsService(candidateId);

  responseUser(res, 200, response);
};

export const candidateApplyingJobs = async (req, res) => {
  const { id: jobId } = req.params;
  const candidateId = req.userId;

  if (!jobId) appError("required details not found", 400);

  const response = await candidateApplyInJobsService(jobId, candidateId);

  responseUser(res, 200, response);
};
