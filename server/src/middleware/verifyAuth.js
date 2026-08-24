import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) appError("token not found", 401);

    const decode = jwt.verify(token, "sfd");

    req.userId = decode.userId;

    return next();
  } catch (error) {
    console.log(error);
    throw new Error("failed to verify user token", error);
  }
};

export const verifyUserRole = async (req, res, next) => {
  try {
    const id = req.userId;

    if (!id) appError("required details not found", 400);

    const user = await User.findByPk(id);

    if (user.role !== "recruiter")
      appError("only recruiter allowed to create job", 400);

    req.userId = user.id;
    return next();
  } catch (error) {
    console.log(error);

    throw new Error("failed to verify user role");
  }
};
