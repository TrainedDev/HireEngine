import db from "../models/index.cjs";
import { appError } from "../utils/appError.utils.js";

const { AppliedJob, Job, User } = db;

export const getRecruiterAppliedJobsService = async (recruiterId) => {
  const recruiterJobs = await Job.findAll({
    where: { recruiterId },
    include: [
      {
        model: AppliedJob,
        attributes: { exclude: ["jobId", "JobTitle", "id"] },
        as: "applied_jobs",
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "password"],
            },
            as: "candidate_application",
          },
        ],
      },
    ],
  });

  const appliedJobs = recruiterJobs.map((ele) => ({
    jobId: ele.id,
    jobTitle: ele.jobTitle,
    applied_candidate_application: ele.applied_jobs,
  }));

  return {
    success: true,
    message: "recruiter applied job successfully fetched",
    data: appliedJobs,
  };
};

export const getCandidateAppliedJobsService = async (candidateId) => {
  const candidateJobs = await AppliedJob.findAll({
    where: { candidateId },
  });

  if (!candidateJobs) appError("jobs not found", 404);

  return {
    success: true,
    message: "candidate job successfully fetched",
    data: candidateJobs,
  };
};

export const candidateApplyInJobsService = async (jobId, candidateId) => {
  const isJobApplied = await AppliedJob.findOne({
    where: { jobId, candidateId },
  });

  if (isJobApplied) appError("job already applied", 400);

  const applyJob = await AppliedJob.create({ jobId, candidateId });

  return { success: true, message: "job successfully applied", data: applyJob };
};
