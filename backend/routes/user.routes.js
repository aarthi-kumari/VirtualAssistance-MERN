import express from "express"
import { getCurrentUser } from "../controllers/user.controller.js"
import { signUp, Login as login, logout } from "../controllers/auth.controller.js"

const userRouter = express.Router()

userRouter.get("/current",getCurrentUser)

export default userRouter