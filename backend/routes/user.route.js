import express from "express";
import {
  followUnfollow,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/UserController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/:id/profile", isAuth, getProfile);
router.post(
  "/profile/edit",
  isAuth,
  upload.single("profilepic"),
  updateProfile
);
router.get("/suggested", isAuth, getSuggestedUsers);
router.post("/connection/:id", isAuth, followUnfollow);
export default router;
