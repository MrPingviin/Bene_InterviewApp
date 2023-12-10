import mongoose from "mongoose";
import env from 'dotenv';
env.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { connectToDatabase };