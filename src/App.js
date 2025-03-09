import React, { useState, useEffect } from 'react';
import HeaderBar from './components/HeaderBar';
import CurrentDayForecast from './components/CurrentDayForecast';
import WeeklyForecastTable from './components/WeeklyForecastTable';
import { getCurrentWeather, getForecast } from './services/weatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('Tel Aviv');
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (selectedCity) => {
    if (!selectedCity) return;
    setLoading(true);
    try {
      const currentRes = await getCurrentWeather(selectedCity);
      const forecastRes = await getForecast(selectedCity, 7);
      setCurrentData(currentRes.data);
      setForecastData(forecastRes.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCity(`${lat},${lon}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="appContainer">
      <HeaderBar
        currentCity={city}
        onCityChange={handleCityChange}
        onGeolocation={handleGeolocation}
      />
      <div className="contentContainer">
        {loading && <div className="loading">Loading weather data...</div>}
        {!loading && currentData && <CurrentDayForecast weather={currentData} />}
        {!loading && forecastData && <WeeklyForecastTable weather={forecastData} />}
      </div>
    </div>
  );
}

export default App;
