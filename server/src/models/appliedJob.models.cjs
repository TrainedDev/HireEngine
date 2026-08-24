module.exports = (sq, datatype) => {
  const AppliedJob = sq.define(
    "AppliedJob",
    {
      id: {
        type: datatype.UUID,
        defaultValue: datatype.UUIDV4,
        primaryKey: true,
      },
      jobStatus: {
        type: datatype.ENUM("pending", "success", "reject"),
        defaultValue: "pending",
      },
    },
    {
      timestamps: true,
      tableName: "job_app_management_appliedJob",
    },
  );

  AppliedJob.associate = (models) => {
    AppliedJob.belongsTo(models.User, { foreignKey: "candidateId" });
    AppliedJob.belongsTo(models.Job, { foreignKey: "jobId" });
  };

  return AppliedJob;
};
