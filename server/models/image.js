import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const imageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      lowercase: true,
    },
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    image_prompt: {
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

export default mongoose.model("Image", imageSchema);
