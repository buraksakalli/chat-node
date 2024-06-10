import jwt from "jsonwebtoken";

import generateToken from "../src/utils/generateToken";

describe("generateToken", () => {
  it("should generate a valid JWT token", () => {
    const id = "123";
    const username = "testuser";
    const token = generateToken(id, username);

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "private") as {
      id: string;
      username: string;
    };

    expect(decoded.id).toBe(id);
    expect(decoded.username).toBe(username);
  });
});
