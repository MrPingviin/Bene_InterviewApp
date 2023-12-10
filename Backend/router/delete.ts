import express from 'express';
const router = express.Router();
import { deleteHistoryItem } from '../logic/deleteHistoryItem.ts';

router.post('/', async (req, res) => {
    try {
        if (req.body.city_name === (undefined || "")) {
            return res.status(404).send({ message: "City not found" }); 
        }
        const result = await deleteHistoryItem(req.body.city_name);
        if (!result) {
            return res.status(404).send({ message: "City not found!" });
        }
        return res.status(200).send({ message: "City removed!" });
    } catch (error) {
        console.log(error);
        return res.status(503).send({ message: "Server error" });
    }
});

export default router;