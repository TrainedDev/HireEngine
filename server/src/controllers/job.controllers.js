export const createJob = async (req, res) => {
  const recruiterId = req.userId;
  const { jobTitle, jobDescription, skills } = req.body;

  if (!jobTitle || !jobDescription || !skills || !recruiterId)
    appError("required details not found", 400);

  const response = await createJobService(
    jobTitle,
    jobDescription,
    skills,
    recruiterId,
  );

  responseUser(res, 201, response);
};

export const getAllJobs = async (req, res) => {
  const response = await getAllJobsService();

  responseUser(res, 200, response);
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  if (!id) appError("required details not found", 400);

  const response = await getJobService(id);

  responseUser(res, 200, response);
};

export const getRecruiterJobs = async (req, res) => {
  const recruiterId = req.userId;

  const response = await getRecruiterJobsService(recruiterId);

  responseUser(res, 200, response);
};

export const updateCandidateJobStatus = async (req, res) => {
  const { id: jobId } = req.params;
  const { jobStatus, candidateId } = req.body;

  if (!jobId || !jobStatus || !candidateId)
    appError("required details not found", 400);

  const response = await updateCandidateJobStatusService(
    jobId,
    candidateId,
    jobStatus,
  );

  responseUser(res, 200, response);
};
