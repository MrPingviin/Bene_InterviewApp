import mongoose, { Schema, Types } from "mongoose";
import { historyModel } from "../models/city_history.ts";
import env from 'dotenv';
env.config();
import { CityHistory } from '../types/cityHistory.ts';

const downloadHistoryFiltered = async (cityName: string): Promise<CityHistory | []> => {
    try {
        const result = await historyModel.find({city_name: cityName});
        if (result !== null && result !== undefined && result.length > 0) {
            return result[0] as CityHistory;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { downloadHistoryFiltered };