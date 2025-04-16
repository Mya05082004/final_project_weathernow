import React from "react";
import "../weather-animation.css"; 
import Image from "next/image";


const WeatherCard = ({ weatherData }: { weatherData: WeatherData }) => {
  const weatherType = weatherData.main.toLowerCase();
  const windSpeed = weatherData.wind;
  const windSpeedClass =
    windSpeed < 5
      ? "wind-slow"
      : windSpeed < 10
      ? "wind-moderate"
      : "wind-fast";

  return (
    <div className="w-full md:w-[90%] lg:w-[80%] h-[80vh] rounded-xl text-white shadow-lg relative overflow-hidden bg-sky-400 p-[20px] m-[20px]">
      {/* Sunshine Effect */}
      {weatherType === "clear" && <div className="sun"></div>}

      {/* Rain Effect */}
      {weatherType === "wind" && (
        <div className="rain-container">
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index} className="rain"></div>
          ))}
        </div>
      )}

      {/* Snow Effect */}
      {weatherType === "snow" && (
        <div className="snow-container">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className="snow"></div>
          ))}
        </div>
      )}

      {/* Wind Effect */}
      <div className={`wind ${windSpeedClass}`}></div>

      {/* Weather Content */}
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt={weatherData.description}
        width={200}
        height={100}
        className="mx-auto"
        />
        <p className="text-6xl py-[20px]">{weatherData.temp}°C</p>
      <div className="weather_infor">
        <h2 className="text-3xl font-bold">{weatherData.name}</h2>
        <p className="text-xl capitalize">{weatherData.description}</p>

      </div>
        <div className="weather_more">
            <p className="text-xl mt-2">Feels like: {weatherData.feels_like}°C</p>
            <p className="text-lg">Wind speed: {windSpeed} m/s</p>

        </div>
    </div>
  );
};

export default WeatherCard;
