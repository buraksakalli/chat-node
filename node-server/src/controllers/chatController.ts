import { Request, Response } from "express";

import Message from "../models/Message";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message } = req.body;

    const newMessage = new Message({
      userId: req.user?.id,
      username: req.user?.username,
      message,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).send("Error sending message");
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).send("Error retrieving chat history");
  }
};

export const deleteMessage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { messageId } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).send("Message not found");
    }

    if (message.userId !== req.user?.id) {
      return res.status(403).send("You can not delete this message");
    }

    await message.remove();
    res.status(200).send("Message deleted");
  } catch (err) {
    res.status(500).send("Error deleting message");
  }
};
