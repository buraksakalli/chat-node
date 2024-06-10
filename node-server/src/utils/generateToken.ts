import jwt from "jsonwebtoken";

const generateToken = (id: string, username: string) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });
};

export default generateToken;
