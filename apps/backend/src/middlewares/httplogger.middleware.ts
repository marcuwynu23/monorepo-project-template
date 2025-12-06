import { NextFunction, Request, Response } from "express";
// Helper colors
export const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};

// Function to color HTTP status
const colorStatus = (status: number) => {
  if (status >= 500) return `${colors.red}${status}${colors.reset}`;
  if (status >= 400) return `${colors.yellow}${status}${colors.reset}`;
  if (status >= 300) return `${colors.cyan}${status}${colors.reset}`;
  if (status >= 200) return `${colors.green}${status}${colors.reset}`;
  return `${status}`;
};

// Function to color method
const colorMethod = (method: string) => {
  switch (method) {
    case "GET":
      return `${colors.cyan}${method}${colors.reset}`;
    case "POST":
      return `${colors.green}${method}${colors.reset}`;
    case "PUT":
      return `${colors.yellow}${method}${colors.reset}`;
    case "DELETE":
      return `${colors.red}${method}${colors.reset}`;
    default:
      return method;
  }
};

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toLocaleString();
    const clientIp = req.ip || req.connection.remoteAddress || "unknown";
    const status = colorStatus(res.statusCode);
    const method = colorMethod(req.method);
    const path = req.originalUrl;

    console.log(
      `[${status}] ${colors.gray}${timestamp}${colors.reset} ${colors.magenta}${clientIp}${colors.reset} ${method} ${path} ${colors.blue}${duration}ms${colors.reset}`
    );
  });

  next();
};
