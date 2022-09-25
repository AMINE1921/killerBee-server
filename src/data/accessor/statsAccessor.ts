import Frisbee from "../models/frisbeeModel";
import Ingredient from "../models/ingredientModel";
import Process from "../models/processModel";
import logger from "../../utils/logger";

const getCountFrisbees = async () =>
  await Frisbee.count({}).catch((err: any) => {
    logger.error(`Error in getCounsFrisbees:\n${err}`);
  });

const getCountIngredients = async () =>
  await Ingredient.count({}).catch((err: any) => {
    logger.error(`Error in getCounsFrisbees:\n${err}`);
  });

const getCountProcesses = async () =>
  await Process.count({}).catch((err: any) => {
    logger.error(`Error in getCounsFrisbees:\n${err}`);
  });

export { getCountFrisbees, getCountIngredients, getCountProcesses };
