"use client";
import React, { useEffect, useState } from "react";
import Location from "./components/Location";
import WeatherCard from "./components/WeatherCard";
import "./weather-animation.css";
import Dashboard from "./components/Dashboard";

export default function HomePage() {
  const [coords, setCoords] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  const API_KEY = "35598673d5da409d752b6f092abd23c3";
  const [weather, setWeather] = useState<{
    feels_like: number;
    temp: number;
    name: string;
    main: string;
    description: string;
    icon: string;
    wind: number;
    visibility: number;
    humidity: number;
    sun_rise: number;
    sun_set: number;
  } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const onLocationChange = (lat: number, long: number) => {
    setCoords({ latitude: lat, longitude: long });
  };

  useEffect(() => {
    if (coords.latitude !== null && coords.longitude !== null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          return response.json();
        })
        .then(data => {
          const weatherData = {
            feels_like: data.main.feels_like,
            temp: data.main.temp,
            name: data.name,
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind: data.wind.speed,
            visibility: data.visibility,
            humidity: data.main.humidity,
            sun_rise: data.sys.sunrise,
            sun_set: data.sys.sunset,
          };
          setLoading(false);
          setWeather(weatherData);
        })
        .catch(error => {
          setLoading(false);
          setError(error.message);
        });
    }
  }, [coords.latitude, coords.longitude]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-200 bg-cover"
      style={{backgroundImage: "url(https://i.pinimg.com/736x/c3/ed/50/c3ed5076e0bddac6e28af79041662a02.jpg)"}}
    >
      <Location onLocationChange={onLocationChange} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loading && <p className="text-blue-700 mt-2">Loading forecast...</p>}
      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl mt-4 gap-4">
        {weather && (
          <>
            <div className="w-full md:w-1/3 flex justify-center">
              <WeatherCard weatherData={weather} />
            </div>
            <div className="w-full md:w-2/3 flex justify-center">
              <Dashboard weatherData={weather} />
            </div>
          </>
        )}
      </div>

    </div>
  );
}