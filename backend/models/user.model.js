
// Import mongoose to define schema and model
import mongoose from 'mongoose';

// Define the schema for User collection in MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type : String, // User's name
        required : true
    },
    email : {
        type: String, // User's email (must be unique)
        required : true,
        unique : true
    },
    password : {
        type: String, // Hashed password
        required : true
    },
    assistantName : {
        type : String // Optional: Name of user's assistant
    },
    assistantImage : {
        type : String // Optional: Image URL for assistant
    },
    history:[
        {type:String} // Optional: Array to store chat or action history
    ]

},{timestamps:true}) // Adds createdAt and updatedAt fields automatically

// Create the User model from the schema
const User = mongoose.model("User",userSchema)
export default User; // Export the User model