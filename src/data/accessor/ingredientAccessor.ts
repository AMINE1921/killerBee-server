import Ingredient from "../models/ingredientModel";
import IngredientInterface from "../../interfaces/ingredientsInterface";
import logger from "../../utils/logger";

const createIngredient = async (ingredient: IngredientInterface) => {
  const newProduct = new Ingredient({
    name: ingredient?.name,
    description: ingredient?.description,
  });

  try {
    await newProduct.save();
  } catch (err) {
    logger.error(`Error in createIngredient: \n${err}`);
    throw err;
  }
};

const getAllIngredients = async () =>
  await Ingredient.find({}).catch((err: any) => {
    console.log(`Error in getAllIngredients:\n${err}`);
  });

const getIngredientById = async (ingredientId: string) =>
  await Ingredient.findOne({ _id: ingredientId }).catch((err: any) => {
    console.log(`Error in getIngredientById: ${ingredientId}:\n${err}`);
  });

const editIngredientById = async (ingredient: IngredientInterface) =>
  await Ingredient.findOneAndUpdate(
    { _id: ingredient.ingredientId },
    {
      name: ingredient?.name,
      description: ingredient?.description,
    },
    { new: true }
  );

const deleteIngredientById = async (ingredientId: string) =>
  await Ingredient.findOneAndRemove({ _id: ingredientId });

export {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  editIngredientById,
  deleteIngredientById,
};
