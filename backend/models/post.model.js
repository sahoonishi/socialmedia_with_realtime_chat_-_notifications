import { mongoose } from "mongoose";
const postSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  image: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
export const Post = mongoose.model("Post", postSchema);
