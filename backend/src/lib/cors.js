import { ENV } from "./env.js";

const vercelPreviewOrigin =
  /^https:\/\/chatflow-[a-z0-9-]+-georgeds28s-projects\.vercel\.app$/;

export const isAllowedOrigin = (origin, callback) => {
  const allowed =
    !origin || origin === ENV.CLIENT_URL || vercelPreviewOrigin.test(origin);

  callback(allowed ? null : new Error("Origin not allowed by CORS"), allowed);
};
