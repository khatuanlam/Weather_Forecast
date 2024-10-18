'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { fetchCurrentLocationCity } from "@/lib/utils"
import CONFIG from "@/site.config"
import { DetailWeather } from "@/types"
import { GoogleLogin } from "@react-oauth/google"
import { Cloud } from "lucide-react"
import { useEffect, useState } from 'react'
import { getForecast } from "./services"
import History from "./ui/Sub_His"

export default function Page() {
  const baseData = CONFIG.base;
  const [cityName, setCityName] = useState('');
  const [data, setData] = useState(baseData);
  const [history, setHistory] = useState<DetailWeather[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast()

  useEffect(() => {
    currentCity()
  }, [])

  const saveHistory = () => {
    const updateHistory = [...history, data];
    setHistory(updateHistory);
    toast({
      title: "Saved",
      description: `Weather information for ${data.location?.name} has been saved to history.`,
    })
  }

  const currentCity = async () => {
    setIsLoading(true);
    const t = await fetchCurrentLocationCity();
    const currentCityName = t?.location?.name || 'Not found city';
    setCityName(currentCityName);
    fetchData(cityName);
  }

  const fetchData = async (name: string) => {
    setIsLoading(true);
    const weatherData = await getForecast(name);
    setData(weatherData);
    console.log('Fetch Data');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center space-x-2">
          <Cloud className="h-6 w-6" />
          <h1 className="text-xl font-bold">Weather Dashboard</h1>
        </div>

        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h1 className="px-2 font-bold">Enter a city name</h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              placeholder="E.g. New York, London, Tokyo"
              value={cityName}
              onChange={(e) => setCityName(e.currentTarget.value)}
              className="flex-grow"
            />
            <Button className="bg-blue-600 hover:bg-slate-700 focus:ring-4 focus:ring-slate-300 w-full sm:w-auto" onClick={fetchData}>
              Search
            </Button>
          </div>
          <Button variant="secondary" className="w-full hover:bg-sky-300 focus:ring-4 focus:ring-slate-100" onClick={currentCity}>
            Use Current Location
          </Button>
        </div>

        <Card className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="bg-blue-500 text-white rounded-lg">
            <CardTitle className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <span className="font-extrabold text-xl sm:text-2xl text-center sm:text-left">{data.location?.name} ({data.current.last_updated.split(" ")[0]})</span>
              <img srcSet={data.current.condition.icon} alt="Weather Icon" className="h-16 w-16 sm:h-24 sm:w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div>
                <p className="text-xl sm:text-2xl font-bold">Temperature: {data.current.temp_c}°C</p>
                <p>Wind: {data.current.wind_kph}M/S</p>
                <p>Humidity: {data.current.humidity}%</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-lg font-semibold">Moderate rain</p>
              </div>
            </div>
            <Button onClick={saveHistory} className="my-2 w-full sm:w-auto" variant={"default"}>Save</Button>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold my-4 px-2">4-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
          {data.forecast.forecastday.map((day, index) => (
            <Card onClick={fetchData} className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" key={index}>
              <CardHeader className="bg-gray-200 p-2">
                <CardTitle className="text-sm">{day.date}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <img srcSet={day.day.condition.icon} alt="Weather Icon" className="h-10 w-10 mx-auto" />
                <p className="text-sm">Temp: {day.day.avgtemp_c}°C</p>
                <p className="text-sm">Wind: {day.day.maxwind_mph} M/S</p>
                <p className="text-sm">Humidity: {day.day.avghumidity}%</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <History historyList={history} action={fetchData} data={data} />

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              toast({
                title: "Login Successful",
                description: "You have successfully logged in with Google.",
              })
            }}
            onError={() => {
              console.log('Login Failed');
              toast({
                title: "Login Failed",
                description: "There was an error logging in with Google. Please try again.",
                variant: "destructive",
              })
            }}
          />
        </div>
      </div>
    </div>
  );
}