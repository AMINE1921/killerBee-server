import { Request, Response } from "express";
import ProcessInterface from "../interfaces/processInterface";
import {
  createProcess,
  getAllProcess,
  getProcessById,
  editProcessById,
  deleteProcessById
} from "../data/accessor/processAccessor";

const addProcess = async (req: Request, res: Response) => {
  const { name, description, model, steps } = req.body;
  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const process: ProcessInterface = {
        name: name,
        description: description,
        model: model,
        steps: steps
      };

      await createProcess(process);
      return res
        .status(200)
        .json({ success: true, message: "Process created" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const getProcesses = async (req: Request, res: Response) => {
  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const processes = await getAllProcess();
      return res.status(200).json({ success: true, processes: processes });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const getProcessInfosById = async (req: Request, res: Response) => {
  const processId = req.params.processId;

  try {
    const process = await getProcessById(processId);
    return res.status(200).json({ success: true, process: process });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

const editProcess = async (req: Request, res: Response) => {
  const { name, description, model, steps } = req.body;

  const processId = req.params.processId;

  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const process: ProcessInterface = {
        processId: processId,
        name: name,
        description: description,
        model: model,
        steps: steps
      };
      await editProcessById(process);
      return res
        .status(200)
        .json({ success: true, message: "Process updated" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const deleteProcess = async (req: Request, res: Response) => {
  const processId = req.params.processId;

  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      await deleteProcessById(processId);
      return res
        .status(200)
        .json({ success: true, message: "Process deleted" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

export {
  addProcess,
  getProcesses,
  getProcessInfosById,
  editProcess,
  deleteProcess
};
