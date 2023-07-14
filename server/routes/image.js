import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import { imagePrompt, prompt, prompts } from "../controllers/image";

router.post("/create-image-prompt", requireSignin, imagePrompt);
router.get("/image-prompt-one/:blogId", requireSignin, prompt);
router.get("/image-prompts", requireSignin, prompts);

module.exports = router;
