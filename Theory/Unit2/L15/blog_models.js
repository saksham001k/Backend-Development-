const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" }
});

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" }
});

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

// Schema validation can be checked without connecting to MongoDB.
const post = new Post({
  title: "My first post", slug: "my-first-post", body: "Hello from the blog."
});
const comment = new Comment({
  post: post._id, author: "Saksham", body: "Nice post!"
});
console.log("Post valid:", post.validateSync() === undefined);
console.log("Comment valid:", comment.validateSync() === undefined);
console.log("Invalid status rejected:",
  new Post({ title: "Test", slug: "test", body: "Test", status: "unknown" })
    .validateSync() !== undefined);

// `unique` creates a MongoDB index when connected; it is not a local validator.
