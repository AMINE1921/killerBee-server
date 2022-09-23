import express from "express";

const router = express.Router();
import {
  addFrisbee,
  getFrisbees,
  getFrisbeeInfosById,
  editFrisbee,
  deleteFrisbee,
} from "../controllers/frisbeeController";
import { isLoggedIn, hasAccessRole } from "../middleware/middleware";

router.route("/").get(isLoggedIn, getFrisbees).post(isLoggedIn, addFrisbee);

router
  .route("/:frisbeeId")
  .get(isLoggedIn, getFrisbeeInfosById)
  .put(isLoggedIn, editFrisbee)
  .delete(isLoggedIn, deleteFrisbee);

export default router;
