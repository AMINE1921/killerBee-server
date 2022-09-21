import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer, { Multer } from "multer";

import authentificationRoutes from "./routes/authentificationRoute";
import userRoutes from "./routes/userRoute";

const app: Express = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
})
app.use(multerMid.single('picture'));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authentificationRoutes);
app.use("/api/users", userRoutes);

export default app;
