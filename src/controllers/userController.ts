import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { blacklistToken } from "../data/accessor/blacklistTokensAccessor";
import {
  updateUserById,
  getUserById,
  deleteUserById,
  getAllUsers,
} from "../data/accessor/userAccessor";
import UserInterface from "../interfaces/userInterface";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

const getUser = async (req: Request, res: Response) => {
  const id = req.params.userId;

  if (id == req.userId || req.userRoles?.includes("admin")) {
    try {
      const user = await getUserById(id);
      res.status(200).json({success: true, message: "", user: user});
    } catch (err) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;

  if (id == req.userId || req.userRoles?.includes("techService")) {
    try {
      const newUser: UserInterface = {
        userId: id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail
      };
      const user = await updateUserById(newUser);
      if (id == req.userId) {
        const token = jwt.sign(
          {
            id: id,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: user.roles,
          },
          SECRET,
          { expiresIn: "365d" }
        );

        res
          .status(200)
          .clearCookie("access_token")
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 720,
          })
          .json({success: true, message: "User has been updated", user: user});
      } else {
        res.status(200).json({success: true, message: "User has been updated", user: user});
      }
    } catch (err) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const token = req.cookies.access_token;

  if (id == req.userId || req.userRoles?.includes("admin")) {
    try {
      await deleteUserById(id);

      if (id == req.userId) {
        await blacklistToken(token);

        res
          .status(200)
          .clearCookie("access_token")
          .json({ success: true, message: "User has been deleted !" });
      } else {
        res.status(200).json({ success: true, message: "User has been deleted !" });
      }
    } catch (err) {
      res.status(500).json({ error: true, message: err });
    }
  } else {
    res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({success: true, message: "", users: users});
  } catch (err) {
    res.status(500).json({ error: true, message: err });
  }
};

export { getUser, updateUser, deleteUser, getUsers };