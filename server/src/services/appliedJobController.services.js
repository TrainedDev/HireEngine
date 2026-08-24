import db from "../models/index.cjs";
import { appError } from "../utils/appError.utils.js";

const { AppliedJob, Job, User } = db;


export const getRecruiterAppliedJobsService = async (recruiterId) => {
  const recruiterJobs = await Job.findAll({
    where: { recruiterId },
    include: [AppliedJob],
  });

  if (!recruiterJobs) appError("jobs not found", 404);

  return {
    success: true,
    message: "recruiter applied job successfully fetched",
    data: recruiterJobs,
  };
};

export const getCandidateAppliedJobsService = async (candidateId) => {
  const candidateJobs = await User.findByPk(candidateId, {
    include: [AppliedJob],
  });

  if (!candidateJobs) appError("jobs not found", 404);

  return {
    success: true,
    message: "candidate job successfully fetched",
    data: candidateJobs,
  };
};

export const candidateApplyInJobsService = async (jobId, candidateId) => {
  const applyJob = await AppliedJob.create({ jobId, candidateId });

  return { success: true, message: "job successfully applied", data: applyJob };
};
