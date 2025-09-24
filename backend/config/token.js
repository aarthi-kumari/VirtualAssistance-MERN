
// Import jsonwebtoken to create JWT tokens
import jwt from 'jsonwebtoken'

// Function to generate a JWT token for a user
const genToken =async (userId)=> {
    try{
        // Create a token with userId as payload, secret from env, expires in 10 days
        const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"10d"})
        return token
    }catch(error){
        // Log any errors during token generation
        console.log(error)
    }
}

export default genToken // Export the function