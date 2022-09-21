import mongoose from "mongoose";
import dotenv from 'dotenv';
import logger from "../../utils/logger";

dotenv.config()

mongoose.set("debug", process.env.DB_DEBUG === "true");

const db = mongoose.connection;
const url = process.env.DB_CONNECTION;

db.on("connecting", () => {
  // eslint-disable-next-line no-console
  logger.info("Connecting to MongoDB...");
});

db.once("open", () => {
  // eslint-disable-next-line no-console
  logger.info("Database connection successful !");
});

db.on("error", error => {
  // eslint-disable-next-line no-console
  logger.error(`Connection error: \n${error}`);
});

db.on("disconnected", () => {
  // eslint-disable-next-line no-console
  logger.info("Database disconnected !");
  
    setTimeout(
      () => {
        mongoose.connect(url)
      },
      10000
      );
    }
);

mongoose.connect(url)

export default mongoose;
