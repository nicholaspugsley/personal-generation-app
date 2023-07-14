import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import { blog, blogOne, blogs } from "../controllers/blog";

router.post("/create-blog", requireSignin, blog);
router.get("/blog-one/:blogId", requireSignin, blogOne);
router.get("/blogs", requireSignin, blogs);

module.exports = router;
