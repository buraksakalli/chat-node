import { Router } from "express";

import { getChatHistory, sendMessage } from "../controllers/chatController";
import auth from "../middlewares/auth";

const router = Router();

router.post("/send", auth, sendMessage);
router.get("/history", auth, getChatHistory);

export default router;
