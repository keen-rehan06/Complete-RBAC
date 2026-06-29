import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    "sha256",
    {
      expiresIn: "7d",
    }
  );
};
