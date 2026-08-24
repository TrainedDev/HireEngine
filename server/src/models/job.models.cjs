module.exports = (sq, datatype) => {
  const Job = sq.define(
    "Job",
    {
      id: {
        type: datatype.UUID,
        defaultValue: datatype.UUIDV4,
        primaryKey: true,
      },
      jobTitle: {
        type: datatype.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-z]+$/,
            msg: "only a-z allowed no spaces",
          },
        },
      },
      jobDescription: {
        type: datatype.TEXT,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-z\s]+$/,
            msg: "only a-z and space are allowed",
          },
        },
      },
      skills: {
        type: datatype.ARRAY("STRING"),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["jobTitle"],
        },
      ],
      tableName: "job_app_management_job",
      timestamps: true,
    },
  );

  Job.associate = (models) => {
    Job.belongsTo(models.User, { foreignKey: "recruiterId", as: "recruiter" });
    Job.hasMany(models.AppliedJob, { foreignKey: "jobId", onDelete: "CASCADE", as: "applied_jobs" });
  };

  return Job;
};
