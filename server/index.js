import express from "express";
import dotenv from "dotenv";

dotenv.config();

import tasksRouter from "./routers/tasks.js";
import connectDB from "./db/mongoose.js";

connectDB();

const app = express();

app.use(express.json());
app.use('/tasks', tasksRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});