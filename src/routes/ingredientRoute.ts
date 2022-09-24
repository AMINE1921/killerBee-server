import express from "express";

const router = express.Router();
import {
  addIngredient,
  getIngredients,
  getIngredientInfosById,
  editIngredient,
  deleteIngredient,
} from "../controllers/ingredientController";
import { isLoggedIn, hasAccessRole } from "../middleware/middleware";

router
  .route("/")
    .get(isLoggedIn, getIngredients)
  .post(isLoggedIn, addIngredient);

router
  .route("/:ingredientId")
  .get(isLoggedIn, getIngredientInfosById)
  .put(isLoggedIn, editIngredient)
  .delete(isLoggedIn, deleteIngredient);

export default router;
