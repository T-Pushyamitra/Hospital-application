import { Router } from "express";

import { login } from "../authentication/login";
import { register } from "../authentication/register";

const router = Router()

router.route("/login").post(login);
router.route("/register").post(register);

export default router;