import { Request, Response } from "express";
import {
  getCountFrisbees,
  getCountIngredients,
  getCountProcesses,
} from "../data/accessor/statsAccessor";

const getAllStats = async (req: Request, res: Response) => {
  try {
    const countFrisbees = await getCountFrisbees();
    const countIngredients = await getCountIngredients();
    const countProcesses = await getCountProcesses();
    const stats = {
      totalCount: {
        frisbees: countFrisbees,
        ingredients: countIngredients,
        processes: countProcesses,
      },
    };
    if (!countFrisbees && !countIngredients && !countProcesses) {
      return res.status(404).json({ error: true, message: "No stats found" });
    } else {
      return res.status(200).json({ success: true, stats: stats });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

const getStatsFrisbee = async (req: Request, res: Response) => {
  try {
    const count = await getCountFrisbees();
    const stats = {
      total: count,
    };
    if (!count) {
      return res.status(404).json({ error: true, message: "No frisbee found" });
    } else {
      return res.status(200).json({ success: true, stats: stats });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

const getStatsIngredients = async (req: Request, res: Response) => {
  try {
    const count = await getCountIngredients();
    const stats = {
      total: count,
    };
    if (!count) {
      return res
        .status(404)
        .json({ error: true, message: "No ingredient found" });
    } else {
      return res.status(200).json({ success: true, stats: stats });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

const getStatsProcesses = async (req: Request, res: Response) => {
  try {
    const count = await getCountProcesses();
    const stats = {
      total: count,
    };
    if (!count) {
      return res.status(404).json({ error: true, message: "No process found" });
    } else {
      return res.status(200).json({ success: true, stats: stats });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

export { getAllStats, getStatsFrisbee, getStatsIngredients, getStatsProcesses };
