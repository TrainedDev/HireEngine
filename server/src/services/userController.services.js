import db from "../models/index.cjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { appError } from "../utils/appError.utils.js";
import { config } from "dotenv";

config();

const { JWT_SECRET_KEY } = process.env;
const { User } = db;

export const loginService = async (email, password) => {
  const user = await User.unscoped().findOne({ where: { email } });

  if (!user) appError("invalid credentials");

  const verifyUser = await bcrypt.compare(password, user.password);

  if (!verifyUser) appError("invalid credentials");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return { success: true, message: "user successfully logged In", data: token };
};

export const registerService = async (email, password, username, role) => {
  const user = await User.unscoped().findOne({ where: { email } });

  if (user) appError("user already registered");

  const newUser = await User.create({ username, email, password, role });

  const token = jwt.sign({ userId: newUser.id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return {
    success: true,
    message: "user successfully registered",
    data: token,
  };
};
