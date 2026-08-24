"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("job_app_management_appliedJob", {
      id: {
        type: datatype.UUID,
        defaultValue: datatype.UUIDV4,
        primaryKey: true,
      },
      jobStatus: {
        type: datatype.ENUM("pending", "success", "reject"),
        defaultValue: "pending",
      },
      jobId: {
        type: Sequelize.UUID,
        references: {
          model: "job_app_management_job",
          key: "id",
        }
      },
      candidateId: {
        type: Sequelize.UUID,
        references: {
          model: "job_app_management_user",
          key: "id",
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("job_app_management_appliedJob");
  },
};
