import express from "express";
import { getMessage, sendMessage } from "../controllers/MessageController.js";
import { isAuth } from "./../middlewares/isAuth.js";
const router = express.Router();
router.post("/send/:id", isAuth, sendMessage);
router.get("/get/:id", isAuth, getMessage);
export default router;
