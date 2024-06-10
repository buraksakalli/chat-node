import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    res.status(201).send(`User registered: ${username} ${password}`);
  } catch (err) {
    res.status(500).send("Error registering user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};
