
import CONFIG from "@/site.config";
import { DetailWeather } from "@/types";


export const getForecast = async (city: string) => {
    let response = await fetch(`${CONFIG.URL}/forecast.json?key=${CONFIG.API_KEY}&q=${city || CONFIG.City}&days=12`);

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json();
}

export const getCurrentCity = async (latitude: number, longitude: number): Promise<Partial<DetailWeather>> => {
    let response = await fetch(`${CONFIG.URL}/current.json?key=${CONFIG.API_KEY}&q=${latitude},${longitude}`)
    const cityName = response.json();
    return cityName;
}


