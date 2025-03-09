// src/services/weatherService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';
const DEFAULT_LANG = 'en';

export const getCurrentWeather = (city) => {
  return axios.get(`${API_BASE_URL}/current?city=${encodeURIComponent(city)}&lang=${DEFAULT_LANG}`);
};

export const getForecast = (city, days = 7) => {
  return axios.get(`${API_BASE_URL}/forecast?city=${encodeURIComponent(city)}&days=${days}&lang=${DEFAULT_LANG}`);
};

export const filterHourlyData = (hoursArray, localtime) => {
  const currentLocalTime = new Date(localtime);
  const futureHours = hoursArray.filter((hourItem) => {
    const hourDate = new Date(hourItem.time);
    return hourDate.getTime() >= currentLocalTime.getTime();
  });
  let startIndex = futureHours.findIndex((hourItem) => {
    const hour = new Date(hourItem.time).getHours();
    return hour % 3 === 0;
  });
  if (startIndex === -1) startIndex = 0;
  const every3Hours = [];
  for (let i = startIndex; i < futureHours.length; i += 3) {
    every3Hours.push(futureHours[i]);
    if (every3Hours.length >= 8) break;
  }
  return every3Hours;
};
