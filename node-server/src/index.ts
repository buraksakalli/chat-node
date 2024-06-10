import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";

import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

mongoose
  .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
