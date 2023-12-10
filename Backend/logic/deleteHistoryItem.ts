import mongoose, { Schema, Types } from "mongoose";
import { historyModel } from "../models/city_history.ts";
import env from 'dotenv';
env.config();

const deleteHistoryItem = async (cityName: string) => {
    try {
        await historyModel.findOneAndDelete({city_name: cityName});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { deleteHistoryItem };