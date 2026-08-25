import express from "express";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import appliedJobRoutes from "./routes/appliedJob.routes.js";
import db from "./models/index.cjs";
import { errorHandler } from "./utils/handler.utils.js";

const app = express();
const { sequelize } = db;

app.use(express.json());

app.get("/", (req, res) => res.send("server is live"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/apply", appliedJobRoutes);

sequelize
  .authenticate()
  .then(() => console.log("successfully connected to database"))
  .catch((error) => console.log(`failed to connect database:${error}`));

app.use(errorHandler);

export default app;
