import mongoose from "mongoose";

// Import mongoose library to interact with MongoDB
const connectDb=async ()=>{
    try {
        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected"); // Success message
    } catch (error) {
        // If connection fails, log an error message
        console.log("db not connected");
    }
}

// Export the connectDb function so it can be used in other files
export default connectDb