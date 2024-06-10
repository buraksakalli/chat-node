import { Request, Response } from "express";

import User from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();

    res.status(201).send("User registered");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id.toString(), user.username);

      res.json({ token, userId: user._id, username: user.username });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};
