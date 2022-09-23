import { Request, Response } from "express";
import IngredientInterface from "../interfaces/ingredientsInterface";
import {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  editIngredientById,
  deleteIngredientById,
} from "../data/accessor/ingredientAccessor";

const addIngredient = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const ingredient: IngredientInterface = {
        name: name,
        description: description,
      };

      await createIngredient(ingredient);
      return res
        .status(200)
        .json({ success: true, message: "Ingredient created" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await getAllIngredients();
    if (!ingredients) {
      return res
        .status(404)
        .json({ error: true, message: "Ingredients not found" });
    } else {
      return res.status(200).json({ success: true, ingredients: ingredients });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

const getIngredientInfosById = async (req: Request, res: Response) => {
  const ingredientId = req.params.ingredientId
  try {
      const ingredient = await getIngredientById(ingredientId)
      if(!ingredient) {
          return res.status(404).json({ error: true, message: "Ingredient not found" });
      }else {
          return res.status(200).json({ success: true, ingredient: ingredient });
      }
  } catch (err: any) {
      res.status(500).json({ error: true, message: err });
  }
};

const editIngredient = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const ingredientId = req.params.ingredientId;

  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const ingredient: IngredientInterface = {
        ingredientId: ingredientId,
        name: name,
        description: description,
      };
      await editIngredientById(ingredient);
      return res
        .status(200)
        .json({ success: true, message: "Ingredient updated" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const deleteIngredient = async (req: Request, res: Response) => {
  const ingredientId = req.params.ingredientId;

  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      await deleteIngredientById(ingredientId);
      return res
        .status(200)
        .json({ success: true, message: "Ingredient deleted" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

export { addIngredient, getIngredients, getIngredientInfosById, editIngredient, deleteIngredient };
