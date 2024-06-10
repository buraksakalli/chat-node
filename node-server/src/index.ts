import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
