// components/Dashboard.js
import React from 'react';
import styles from '../Dashboard.module.css';
import { BsFillSunriseFill } from "react-icons/bs";import { BsFillSunsetFill } from "react-icons/bs";

const Dashboard = ({ weatherData: {wind, humidity, visibility, sun_rise, sun_set } }: { weatherData: WeatherData }) => {
    const formatTime = (unixTime: number) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };
        
    const sunriseTime = formatTime(sun_rise);
    const sunsetTime = formatTime(sun_set);
    
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Today's Highlights</h2>
      <div className={styles.card}>
        <h3>UV Index</h3>
        <div className={styles.value}>5</div>
      </div>
      <div className={styles.card}>
        <h3>Wind Status</h3>
        <div className={styles.value}>{wind}</div>
        <div className={styles.details}>WSW</div>
      </div>
      <div className={styles.card}>
        <h3>Sunrise</h3>
        <div className={styles.time}>
          <div className={styles.image}><BsFillSunriseFill /></div>
          <div>{sunriseTime}</div>
        </div>
      </div>
      <div className={styles.card}>
        <h3>Humidity</h3>
        <div className={styles.value}>{humidity}</div>
      </div>
      <div className={styles.card}>
        <h3>Visibility</h3>
        <div className={styles.value}>{visibility}</div>
      </div>
      <div className={styles.card}>
        <h3>Sunset</h3>
        <div className={styles.time}>
          <div className={styles.image}><BsFillSunsetFill /></div>
          <div>{sunsetTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;