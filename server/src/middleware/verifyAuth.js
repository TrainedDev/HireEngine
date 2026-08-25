import jwt from "jsonwebtoken";
import db from "../models/index.cjs";
import { appError } from "../utils/appError.utils.js";
import { config } from "dotenv";

config();

const { User } = db;
const { JWT_SECRET_KEY } = process.env;

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) appError("token not found", 401);

  const decode = jwt.verify(token, JWT_SECRET_KEY);

  req.userId = decode.userId;

  return next();
};

export const verifyUserRole = async (req, res, next) => {
  const id = req.userId;

  if (!id) appError("required details not found", 400);

  const user = await User.findByPk(id);

  if (user.dataValues.role !== "recruiter")
    appError("only recruiter allowed to create job", 400);

  req.userId = id;
  return next();
};
