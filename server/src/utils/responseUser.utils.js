export const responseUser = (res, status, data) => {
  res.status(status || 200).json(data);
};
