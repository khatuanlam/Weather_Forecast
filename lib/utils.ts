import { getCurrentCity } from "@/app/services";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}


export const fetchCurrentLocationCity = async () => {
  try {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const cityName = await getCurrentCity(latitude, longitude);
    console.log(cityName);
    return cityName
  } catch (error) {
    console.error("Error fetching location or city name:", error);
  }
};

// // Schedule daily email at 7 AM
// export const scheduleWeatherEmails = (email: string, weatherData: DetailWeather) => {
//   cron.schedule('0 7 * * *', async () => {
//     try {
//       // Fetch the latest weather data
//       const t = await fetchCurrentLocationCity();
//       const currentCityName = t?.location?.name || 'Not found city';

//       const weatherData = await getForecast(currentCityName);

//       if (weatherData) {
//         await sendWeatherUpdateEmail(email, weatherData);
//         console.log(`Weather email sent to ${email}`);
//       } else {
//         console.error('No weather data available.');
//       }
//     } catch (error) {
//       console.error('Error sending weather email:', error);
//     }
//   }, {
//     timezone: 'Asia/Ho_Chi_Minh' // Adjust timezone as needed
//   });







