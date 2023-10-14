import { Request, Response, NextFunction } from "express";

export const allowedOrigins: string[] = [
  "http://127.0.0.1:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4000",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:4000",
];

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin as string)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};

const corsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export { credentials, corsOptions };
