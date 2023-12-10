import mongoose, { mongo } from 'mongoose';
import env from 'dotenv';
env.config();
const DB_URL = process.env.MONGO_URL || "";
import { historyModel } from '../models/city_history.ts';
import { CityHistory } from '../types/cityHistory.ts';

const uploadHistory = async (result: (CityHistory | [])) => {
    if (result == ({} || [])) {
        return false;
    }

    if (!Array.isArray(result)) {
        try {
            const duplicationCheck = await historyModel.findOne({ city_name: result.city_name });

            if (duplicationCheck !== null) {
                return false;
            }

            const newHistory = new historyModel({
                city_name: result.city_name,
                lat: result.lat,
                lon: result.lon
            })

            await newHistory.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}

export { uploadHistory };