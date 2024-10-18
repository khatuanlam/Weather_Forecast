export type WeatherConditions = {
  date: string
  day: {
    condition: {
      icon: string,
      text: string,
    },
    avgtemp_c: string,
    maxwind_mph: string,
    avghumidity: string,
  },

}

export type DetailWeather = {
  current: {
    last_updated: string,
    temp_c: number,
    wind_kph: number,
    humidity: number,
    condition: {
      icon: string,
      text: string
    }
  },
  location: {
    name: string
  },
  forecast: { forecastday: Array<WeatherConditions> }
}


// HistoryProps interface
export interface HistoryProps {
  historyList: DetailWeather[]; // historyList là một mảng các đối tượng DetailWeather
  action: () => Promise<void>;
  data: DetailWeather
}