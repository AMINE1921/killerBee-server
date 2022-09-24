import { Request, Response } from "express";
import FrisbeeInterface from "../interfaces/frisbeeInterface";
import {
  createFrisbee,
  getAllFrisbee,
  getFrisbeeById,
  editFrisbeeById,
  deleteFrisbeeById,
} from "../data/accessor/frisbeeAccessor";

const addFrisbee = async (req: Request, res: Response) => {
  const { name, description, price, range, ingredients } = req.body;
  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const frisbee: FrisbeeInterface = {
        name: name,
        description: description,
        price: price,
        range: range,
        ingredients: ingredients,
      };

      await createFrisbee(frisbee);
      return res
        .status(200)
        .json({ success: true, message: "Frisbee created" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const getFrisbees = async (req: Request, res: Response) => {
  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const frisbees = await getAllFrisbee();
      return res.status(200).json({ success: true, frisbees: frisbees });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const getFrisbeeInfosById = async (req: Request, res: Response) => {
  const frisbeeId = req.params.frisbeeId;

  try {
    const frisbee = await getFrisbeeById(frisbeeId);
    return res.status(200).json({ success: true, frisbee: frisbee });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err });
  }
};

const editFrisbee = async (req: Request, res: Response) => {
  const { name, description, price, range, ingredients } = req.body;

  const frisbeeId = req.params.frisbeeId;

  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      const frisbee: FrisbeeInterface = {
        frisbeeId: frisbeeId,
        name: name,
        description: description,
        price: price,
        range: range,
        ingredients: ingredients,
      };
      await editFrisbeeById(frisbee);
      return res
        .status(200)
        .json({ success: true, message: "Frisbee updated" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const deleteFrisbee = async (req: Request, res: Response) => {
  const frisbeeId = req.params.frisbeeId;

  if (req.userRoles?.includes("operator") || req.userRoles?.includes("admin")) {
    try {
      await deleteFrisbeeById(frisbeeId);
      return res
        .status(200)
        .json({ success: true, message: "Frisbee deleted" });
    } catch (err: any) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

export {
  addFrisbee,
  getFrisbees,
  getFrisbeeInfosById,
  editFrisbee,
  deleteFrisbee,
};
