// Import helper functions and models
import genToken from "../config/token.js" // Function to generate JWT token
import User from "../models/user.model.js" // User model for MongoDB
import bcrypt from 'bcryptjs' // Library for hashing passwords
// Controller for user signup
// Handles registration logic: checks for existing email, validates password, hashes password, creates user, and sets JWT cookie
export const signUp=async (req,res)=>{
    try{
        const {name,email,password}=req.body

        const existEmail=await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"email already exists!"})
        }

        if(password.length<6){
            return res.status(400).json({message: "password must be atleast 6 characters !"})
        }
        
        const hashedPassword=await bcrypt.hash(password,10)
        
        const user=await User.create({name,email,password:hashedPassword})

        const token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:10*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })
        return res.status(201).json(user)

    }catch(error) {
        return res.status(500).json({message:`sign up error ${error}`})
    }
}

// Controller for user login
// Handles login logic: checks if user exists, compares password, sets JWT cookie if successful
export const Login=async (req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"email does not exists!"})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"incorrect password!"})
        }
        
        const token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:10*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })
        return res.status(200).json(user)

    }catch(error) {
        return res.status(500).json({message:`login error ${error}`})
    }
}

// Controller for user logout
// Clears the authentication token cookie to log the user out
export const logout=async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"successfully logged out"})
    }catch(error) {
        return res.status(500).json({message:`logout error ${error}`})
    }

}