import { Types } from "mongoose"

type CityHistory = {
    //_id: Types.ObjectId,
    city_name: string,
    lat: number,
    lon: number
}

export type { CityHistory };
