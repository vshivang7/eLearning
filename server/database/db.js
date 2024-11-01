import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";

export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB);
        console.log("Mongoose DataBase Connected");
    } catch (error) {
        console.log(error);
    }
};
// export default connectDb