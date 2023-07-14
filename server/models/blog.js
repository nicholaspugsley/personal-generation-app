import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    keywords: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    topic: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    postContent: {
      type: {},
      minlength: 100,
      required: true,
    },
    metaDescription: {
      type: {},
      minlength: 100,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
