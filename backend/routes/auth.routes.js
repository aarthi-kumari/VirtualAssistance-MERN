
// Import express and authentication controllers
import express from "express"
import { signUp, Login as login, logout } from "../controllers/auth.controller.js"

const authRouter = express.Router() // Create a new router for authentication

// Route for user signup
authRouter.post("/signup",signUp)
// Route for user signin/login
authRouter.post("/signin",login)
// Route for user logout
authRouter.get("/logout",logout)

export default authRouter // Export the router