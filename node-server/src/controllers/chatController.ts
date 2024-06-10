import { Request, Response } from "express";

import Message from "../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, username, message } = req.body;

    const newMessage = new Message({ userId, username, message });
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
