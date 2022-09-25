import express from "express";

const router = express.Router();
import {
  getAllStats,
  getStatsFrisbee,
  getStatsIngredients,
  getStatsProcesses,
} from "../controllers/statsController";
import { isLoggedIn, hasAccessRole } from "../middleware/middleware";

router.route("/").get(isLoggedIn, getAllStats);
router.route("/frisbees").get(isLoggedIn, getStatsFrisbee);
router.route("/ingredients").get(isLoggedIn, getStatsIngredients);
router.route("/processes").get(isLoggedIn, getStatsProcesses);

export default router;
