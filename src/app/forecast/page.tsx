"use client";

import React, { useEffect, useState } from "react";
import Location from "../components/Location";
import { BiCurrentLocation } from "react-icons/bi";

interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export default function ForecastPage() {
  const [coords, setCoords] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const onLocationChange = (lat: number, long: number) => {
    setCoords({ latitude: lat, longitude: long });
  };

  useEffect(() => {
    if (coords.latitude !== null && coords.longitude !== null) {
      const API_KEY = "9823739f0041f934360ab1c8d36efd06";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch forecast data");
          return res.json();
        })
        .then((data) => {
          const noonForecasts = data.list.filter((item: ForecastItem) =>
            item.dt_txt.includes("12:00:00")
          );

          setForecast(noonForecasts.slice(0, 7)); // Only 7 days
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [coords.latitude, coords.longitude]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-blue-400 p-4 bg-cover"
        style={{ backgroundImage: "url(https://i.pinimg.com/736x/36/60/79/3660798d8447e40889664de849cddea8.jpg)" }}
    >
      <Location onLocationChange={onLocationChange} />
      <h1 className="text-3xl font-bold text-center mt-4">Current Location</h1>
      {loading && <p className="text-blue-700 mt-2">Loading forecast...</p>}
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
        {forecast.map((day) => (
          <div key={day.dt} className="bg-white p-4 rounded-lg shadow transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-blue-50 text-center">
            <h3 className="text-xl font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </h3>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto"
            />
            <p className="capitalize">{day.weather[0].description}</p>
            <p className="text-lg font-bold">
              {Math.round(day.main.temp_max)}°C

            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
