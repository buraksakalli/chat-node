import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string) => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded?.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const getUsernameFromToken = (token: string) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    return null;
  }
};
