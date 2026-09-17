import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "../lib/env.js";

const aj = ENV.ARCJET_KEY
  ? arcjet({
      key: ENV.ARCJET_KEY,
      characteristics: ["ip.src"],
      rules: [
        shield({ mode: "LIVE" }),
        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
        slidingWindow({
          mode: "LIVE",
          interval: 60,
          max: 50,
        }),
      ],
    })
  : null;

export const arcjetProtection = async (req, res, next) => {
  if (!aj) {
    return next();
  }

  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests — please try again later." });
      }

      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Arcjet error:", error);
    next();
  }
};
