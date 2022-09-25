import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";

import authentificationRoutes from "./routes/authentificationRoute";
import userRoutes from "./routes/userRoute";
import ingredientRoutes from "./routes/ingredientRoute";
import frisbeeRoutes from "./routes/frisbeeRoute";
import processRoutes from "./routes/processRoute";
import statsRoutes from "./routes/statsRoutes";

const app: Express = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});
app.use(multerMid.single("picture"));
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
app.use("/api/frisbees", frisbeeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/processes", processRoutes);
app.use("/api/stats", statsRoutes);

export default app;
