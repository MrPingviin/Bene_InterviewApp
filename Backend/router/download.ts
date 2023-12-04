import express from 'express';
const router = express.Router();
import { downloadHistory } from '../logic/downloadHistory.ts';
import { downloadCityInfo } from '../logic/downloadCityInfo.ts';
import { CityInfo } from '../types/cityInfo.ts';
import { downloadHistoryFiltered } from '../logic/downloadHistoryFiltered.ts';
import { CityHistory } from '../types/cityHistory.ts';

router.get('/history', async (req, res) => {
    try {
        const history: CityHistory[] = await downloadHistory();
        res.status(200).send(history);
    } catch (error) {
        console.log(error);
        res.status(503).send([] as CityHistory[]);
    }
});

router.post('/weather_info', async (req, res) => {
    try {
        const cityDetails: CityHistory | [] = await downloadHistoryFiltered(req.body.city_name);
        if (!Array.isArray(cityDetails)) {
            const info: CityInfo = await downloadCityInfo(cityDetails.lat, cityDetails.lon);
            if (info.weather[0].main.length > 0) {
                res.status(200).send({
                    info: {
                        weather: info.weather[0],
                        main: info.main,
                        sunset: info.sys.sunset,
                        sunrise: info.sys.sunrise,
                        timezone: info.timezone,
                    }
                });
            } else {
                res.status(404).send({ message: "City was not found" });
            }
        } else {
            res.status(404).send({ message: "City was not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(503).send("Server error");
    }
});

export default router;