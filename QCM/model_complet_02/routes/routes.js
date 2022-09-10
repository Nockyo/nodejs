import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import { createUser } from "../controllers/home.js";
import { logUser, login } from "../controllers/login.js";
import { dashboard } from "../controllers/dashboard.js";
import checkSecurity from "../middlewares/checkSecurity.js";

router.get("/", HomeController);
router.post("/", createUser);
router.get("/login", login);
router.post("/login", logUser);
router.get("/dashboard", checkSecurity, dashboard);

export default router;
