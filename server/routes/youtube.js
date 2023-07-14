import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import { youtubeScript, scripts, script } from "../controllers/youtube";

router.post("/create-youtube-script", requireSignin, youtubeScript);
router.get("/script-one/:scriptId", requireSignin, script);
router.get("/scripts", requireSignin, scripts);

module.exports = router;
