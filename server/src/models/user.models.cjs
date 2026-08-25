module.exports = (sq, datatype) => {
  const User = sq.define(
    "User",
    {
      id: {
        type: datatype.UUID,
        defaultValue: datatype.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: datatype.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-z]+$/,
            msg: "only a-z allowed no spaces",
          },
        },
      },
      password: {
        type: datatype.STRING,
        allowNull: false,
        validate: {
          min: {
            args: 6,
            msg: "invalid password minimum length should 6",
          },
        },
      },
      email: {
        type: datatype.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "invalid email",
          },
        },
      },
      role: {
        type: datatype.ENUM("recruiter", "candidate"),
        defaultValue: "candidate",
      },
    },
    {
      indexes: [
        {
          fields: ["email"],
          unique: true,
        },
      ],
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            const bcrypt = require("bcrypt");
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },

      tableName: "job_app_management_user",
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Job, {
      foreignKey: "recruiterId",
      onDelete: "CASCADE",
      as: "recruiter_jobs",
    });
    User.hasMany(models.AppliedJob, {
      foreignKey: "candidateId",
      onDelete: "CASCADE",
    });
  };

  return User;
};
