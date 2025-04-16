"use client"
import {useEffect} from "react";

export default function Location({onLocationChange}) {
  useEffect (() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        // update state with lat and long
        onLocationChange(lat, long);
      },
      (error) => {
        console.error("Error getting location: ", error.message);
      }); 
  }, []);
  return null;
 
}