import express from "express";
import { isAuth } from "./../middlewares/isAuth.js";
import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  disLikePost,
  getAllPost,
  getCommentsOfPost,
  getYourPosts,
  likePost,
} from "../controllers/PostController.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/addpost", isAuth, upload.single("image"), addNewPost);
router.get("/getallposts", getAllPost);
router.get("/getyourposts", isAuth, getYourPosts);
router.get("/:id/likes", isAuth, likePost);
router.get("/:id/dislikes", isAuth, disLikePost);
router.post("/:id/addcomment", isAuth, addComment);
router.get("/:id/allcomments", isAuth, getCommentsOfPost);
router.delete("/delete/:id", isAuth, deletePost);
router.get("/:id/bookmark", isAuth, bookmarkPost);

export default router;
