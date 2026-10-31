import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

const authCookieOptions = {
  httpOnly: true,
  sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
  secure: ENV.NODE_ENV === "production",
  path: "/",
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    ...authCookieOptions,
  });
};

export const clearToken = (res) => {
  res.clearCookie("jwt", authCookieOptions);
};
