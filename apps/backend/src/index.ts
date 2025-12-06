import express, { Request, Response } from "express";
import { colors, httpLogger } from "./middlewares/httplogger.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());

// HTTP request logger middleware
app.use(httpLogger);

// Routes
app.get("/api/check", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend using Express and tsx!" });
});

app.get("/api/users", (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Sebastian" },
  ];
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`${colors.bold}${colors.blue}INFO${colors.reset} Server running on http://localhost:${PORT}`);
});
