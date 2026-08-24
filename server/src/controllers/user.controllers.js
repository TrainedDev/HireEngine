import { appError } from "../utils/appError.utils.js";
import { responseUser } from "../utils/responseUser.utils.js";


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) appError("required details not found", 400);

  const response = await loginService(email, password);

  responseUser(res, 200, response);
};

export const register = async (req, res) => {
  const { email, password, username, role } = req.body;

  if (!email || !password || username || !role)
    appError("required details not found", 400);

  const response = await registerService(email, password, username, role);

  responseUser(res, 201, response);
};
