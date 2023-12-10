import mongoose from "mongoose";
import env from 'dotenv';
env.config();

const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { disconnectFromDatabase };