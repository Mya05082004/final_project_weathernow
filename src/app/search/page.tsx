"use client";
import React, { useState } from "react";
import styles from '../SearchPage.module.css'; // Import the CSS module

const API_KEY = "9823739f0041f934360ab1c8d36efd06";

const SearchPage: React.FC = () => {
  const [location, setLocation] = useState("");
  const [weatherList, setWeatherList] = useState<any[]>([]); // Store weather data for all locations
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();
      setWeatherList((prev) => [...prev, data]); // Append new weather data to the list
      setError(null);
      setLocation(""); // Clear input after successful fetch
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchCard}>
        <h1 className={styles.title}>🔍 Search Weather</h1>
        <input
          type="text"
          placeholder="Enter a city name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={fetchWeather}
          className={styles.button}
        >
          Get Weather
        </button>
        {error && <p className={styles.error}>⚠️ {error}</p>}
      </div>

      <div className={styles.displayCard}>
        {weatherList.length > 0 && (
          <div className={styles.weatherInfo}>
            <h2>Weather for Multiple Locations</h2>
            {weatherList.map((weather, index) => (
              <div key={index}>
                <h3>{weather.name}, {weather.sys.country}</h3>
                <p>🌡️ Temp: {weather.main.temp}°C</p>
                <p>💧 Humidity: {weather.main.humidity}%</p>
                <p>🌬️ Wind: {weather.wind.speed} m/s</p>
                <p>🌥️ Condition: {weather.weather[0].description}</p>
                {index < weatherList.length - 1 && <hr />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;