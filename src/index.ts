require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes/TaskRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
