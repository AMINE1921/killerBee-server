import express from "express";

const router = express.Router();
import { getUser, updateUser, deleteUser, getUsers } from "../controllers/userController";
import { isLoggedIn, hasAccessRole } from "../middleware/middleware";

router.route("/").get(hasAccessRole(["admin"]), getUsers);
//information about user
router.route("/:userId")
  .get(isLoggedIn, getUser)
  .put(isLoggedIn, updateUser)
  .delete(isLoggedIn, deleteUser);


export default router;
