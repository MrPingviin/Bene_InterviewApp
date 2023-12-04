import { CityHistory } from "../../types/cityHistory";

const HistoryGetter = async (): Promise<CityHistory[]> => {
    try {
        const response = await fetch('http://localhost:3500/download/history');
        const data: CityHistory[] = await response.json();
        return data as CityHistory[];
    } catch (error) {
        console.log(error);
        return [] as CityHistory[];
    }
}

export { HistoryGetter };