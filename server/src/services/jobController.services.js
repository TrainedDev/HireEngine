import db from "../models/index.cjs";
import { appError } from "../utils/appError.utils.js";

const { Job } = db;

export const createJobService = async (
  jobTitle,
  jobDescription,
  skills,
  recruiterId,
  jobStatus,
) => {
  const newJob = await Job.create(
    jobTitle,
    jobDescription,
    skills,
    recruiterId,
    jobStatus,
  );

  return { success: true, message: "job successfully created", data: newJob };
};

export const getAllJobsService = async () => {
  const jobs = await Job.findAll();

  if (!jobs) appError("jobs not found", 404);

  return { success: true, message: "jobs successfully fetched", data: jobs };
};

export const getJobService = async (id) => {
  const job = await Job.findByPk(id);

  if (!job) appError("jobs not found", 404);

  return { success: true, message: "job fetched successfully", data: job };
};

export const getRecruiterJobsService = async (userId) => {
  const jobs = await Job.findAll({ where: { userId } });

  if (!jobs) appError("jobs not found", 404);

  return {
    success: true,
    message: "recruiter job successfully fetched",
    data: jobs,
  };
};

export const updateCandidateJobStatusService = async (
  jobId,
  candidateId,
  jobStatus,
) => {
  await AppliedJob.update({ jobStatus }, { where: { jobId, candidateId } });

  return {
    success: true,
    message: "candidate job status updated successfully",
  };
};