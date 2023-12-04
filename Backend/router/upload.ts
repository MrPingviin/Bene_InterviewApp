import express from 'express';
const router = express.Router();
import { coordinateFinder } from '../logic/coordinateFinder.ts';
import { uploadHistory } from '../logic/uploadHistory.ts';
import { CoordinateFinderResult } from '../types/coordinateFinderResult.ts';

router.post('/', async (req, res) => {
    try {
        const cityInformations: CoordinateFinderResult = await coordinateFinder(req.body.city_name);
        if (cityInformations.city_name === (undefined || "")) {
            return res.status(404).send({ message: "City not found" }); 
        }
        const result = await uploadHistory({city_name: cityInformations.city_name, lat: cityInformations.lat, lon: cityInformations.lon});
        if (!result) {
            return res.status(409).send({ message: "City already exists" });
        }
        return res.status(200).send({ message: "City added" });
    } catch (error) {
        console.log(error);
        return res.status(503).send({ message: "Server error" });
    }
});

export default router;