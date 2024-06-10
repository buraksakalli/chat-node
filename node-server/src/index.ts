import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import Message from "./models/Message";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/chat", chatRoutes);

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

const chatRoom = "single-chat-room";

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.join(chatRoom);

  // Load existing messages for the user
  socket.on("load messages", async () => {
    const messages = await Message.find().sort({ timestamp: 1 });
    socket.emit("chat history", messages);
  });

  socket.on("chat message", async (msg) => {
    const { userId, username, message } = msg;
    const newMessage = new Message({ userId, username, message });
    await newMessage.save();

    io.to(chatRoom).emit("chat message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/chat/send", async (req, res) => {
  const { userId, username, message } = req.body;

  const newMessage = new Message({ userId, username, message });
  await newMessage.save();

  console.log("Message sent:", newMessage);
  io.to(chatRoom).emit("chat message", newMessage);

  res.status(201).json(newMessage);
});
