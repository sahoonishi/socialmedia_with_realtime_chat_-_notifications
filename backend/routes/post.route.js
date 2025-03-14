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
router.get("/getallposts", isAuth, getAllPost);
router.get("/getyourposts", isAuth, getYourPosts);
router.get("/:id/likes", isAuth, likePost);
router.get("/:id/dislikes", isAuth, disLikePost);
router.post("/:id/addcomment", isAuth, addComment);
router.get("/:id/allcomments", isAuth, getCommentsOfPost);
router.delete("/delete/:id", isAuth, deletePost);
router.post("/:id/bookmark", isAuth, bookmarkPost);

export default router;
