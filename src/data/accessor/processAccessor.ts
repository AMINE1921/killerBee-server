import Process from "../models/processModel";
import ProcessInterface from "../../interfaces/processInterface";
import logger from "../../utils/logger";

const createProcess = async (process: ProcessInterface) => {
  const newProcess = new Process({
    name: process?.name,
    description: process?.description,
    model: process?.model,
    steps: process?.steps
  });

  try {
    await newProcess.save();
  } catch (err) {
    logger.error(`Error in createFrisbee: \n${err}`);
    throw err;
  }
};

const editProcessById = async (process: ProcessInterface) =>
  await Process.findOneAndUpdate(
    { _id: process.processId },
    {
        name: process?.name,
        description: process?.description,
        model: process?.model,
        steps: process?.steps
    },
    { new: true }
  );

const getAllProcess = async () =>
  await Process.find({})
    .populate("model")
    .catch((err: any) => {
      logger.error(`Error in getAllFrisbee:\n${err}`);
    });

const getProcessById = async (processId: string) =>
  await Process.find({ _id: processId })
    .populate("model")
    .catch((err: any) => {
      logger.error(`Error in getMenusByRestaurantId: ${processId}:\n${err}`);
    });

const deleteProcessById = async (processId: string) =>
  await Process.findOneAndRemove({ _id: processId });

export { createProcess, getAllProcess, getProcessById, editProcessById, deleteProcessById };
