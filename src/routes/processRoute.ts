import express from "express";

const router = express.Router();
import {
  addProcess,
  getProcesses,
  getProcessInfosById,
  editProcess,
  deleteProcess
} from "../controllers/processController";
import { isLoggedIn, hasAccessRole } from "../middleware/middleware";

router.route("/").get(isLoggedIn, getProcesses).post(isLoggedIn, addProcess);

router
  .route("/:processId")
  .get(isLoggedIn, getProcessInfosById)
  .put(isLoggedIn, editProcess)
  .delete(isLoggedIn, deleteProcess);

export default router;
