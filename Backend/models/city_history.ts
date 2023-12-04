import mongoose from "mongoose";

const cityHistorySchema = new mongoose.Schema({
    city_name: String,
    lat: Number,
    lon: Number,
});

const historyModel = mongoose.model("city_history_list", cityHistorySchema);

export { historyModel }