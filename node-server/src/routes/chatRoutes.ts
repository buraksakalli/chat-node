import { Router } from "express";

import {
  deleteMessage,
  getChatHistory,
  sendMessage,
} from "../controllers/chatController";
import auth from "../middlewares/auth";

const router = Router();

router.post("/send", auth, sendMessage);
router.get("/history", auth, getChatHistory);
router.delete("/delete", auth, deleteMessage);

export default router;
