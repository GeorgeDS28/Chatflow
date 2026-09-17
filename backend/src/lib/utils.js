import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,

    // Allow the cookie to be sent between Vercel and Render in production
    sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",

    // Required when SameSite=None is used
    secure: ENV.NODE_ENV === "production",
  });
};
