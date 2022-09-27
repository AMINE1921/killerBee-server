import Frisbee from "../models/frisbeeModel";
import FrisbeeInterface from "../../interfaces/frisbeeInterface";
import logger from "../../utils/logger";

const createFrisbee = async (frisbee: FrisbeeInterface) => {
  const newFrisbee = new Frisbee({
    name: frisbee?.name,
    description: frisbee?.description,
    price: frisbee?.price,
    range: frisbee?.range,
    ingredients: frisbee?.ingredients,
  });

  try {
    await newFrisbee.save();
  } catch (err) {
    logger.error(`Error in createFrisbee: \n${err}`);
    throw err;
  }
};

const editFrisbeeById = async (frisbee: FrisbeeInterface) =>
  await Frisbee.findOneAndUpdate(
    { _id: frisbee.frisbeeId },
    {
      name: frisbee?.name,
      description: frisbee?.description,
      price: frisbee?.price,
      range: frisbee?.range,
      ingredients: frisbee?.ingredients,
    },
    { new: true }
  );

const getAllFrisbee = async () =>
  await Frisbee.find({})
    .populate("ingredients.ingredientId")
    .catch((err: any) => {
      logger.error(`Error in getAllFrisbee:\n${err}`);
    });

const getFrisbeeById = async (frisbeeId: string) =>
  await Frisbee.findOne({ _id: frisbeeId })
    .populate("ingredients.ingredientId")
    .catch((err: any) => {
      logger.error(`Error in getMenusByRestaurantId: ${frisbeeId}:\n${err}`);
    });

const deleteFrisbeeById = async (frisbeeId: string) =>
  await Frisbee.findOneAndRemove({ _id: frisbeeId });

export {
  createFrisbee,
  getAllFrisbee,
  getFrisbeeById,
  editFrisbeeById,
  deleteFrisbeeById,
};
