import mongoose, { Schema, Types } from "mongoose";
import { historyModel } from "../models/city_history.ts";
import env from 'dotenv';
env.config();
import { CityHistory } from '../types/cityHistory.ts';

const downloadHistory = async () => {
    try {
        const result = await historyModel.find({});
        if (result !== null && result !== undefined && result.length > 0) {
            return result as CityHistory[];
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { downloadHistory };