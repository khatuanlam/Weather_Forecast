import { DetailWeather } from "./types"

// Dữ liệu mặc định
const baseData: DetailWeather = {
  current: {
    last_updated: "",
    condition: {
      icon: "",
      text: ""
    },
    temp_c: 0.0,
    wind_kph: 0.0,
    humidity: 0.0
  },
  location: {
    name: "Ho Chi minh"
  },
  forecast: {
    forecastday: []
  }
}


const CONFIG = {
  API_KEY: '02b062f88b8d40da958112605240307',
  URL: 'https://api.weatherapi.com/v1',
  City: 'Ho Chi Minh',
  base: baseData,
  EMAIL_USER: 'khatuanlam777@gmail.com',
  EMAIL_PASS: 'khatuanlam'
}

export default CONFIG