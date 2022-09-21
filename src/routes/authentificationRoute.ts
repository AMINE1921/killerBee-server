import express from 'express';

const router = express.Router();


import { login, register, logout, protect } from "../controllers/authentificationController";

// // middleware
import { isLoggedIn } from  "../middleware/middleware";

router
  .route("/register")
  .post(register)

router
  .route("/login")
  .post(login)

router
  .route("/logout")
  .get(isLoggedIn, logout)

router
  .route("/protected")
  .get(isLoggedIn, protect)

export default router;


