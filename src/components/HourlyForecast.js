// src/components/HourlyForecast.js
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getForecast, filterHourlyData } from '../services/weatherService';
import './HourlyForecast.css';

const HourlyForecast = ({ location }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchHourly = async () => {
      try {
        // Запрашиваем прогноз на 2 дня, чтобы гарантировать наличие будущих интервалов
        const res = await getForecast(location.name, 2);
        if (res.data && res.data.forecast && res.data.forecast.forecastday) {
          const allHours = res.data.forecast.forecastday.flatMap(day => day.hour);
          const filtered = filterHourlyData(allHours, location.localtime);
          setHourlyData(filtered);
        }
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
      }
    };

    if (location && location.name) {
      fetchHourly();
    }
  }, [location]);

  if (!hourlyData.length) {
    return <Typography variant="body2">No hourly data available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        {hourlyData.map((hour) => {
          const dateObj = new Date(hour.time);
          const timeLabel = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={hour.time}>
              <motion.div
                className="glassCard hourlyCardItem"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  y: -5,
                }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="body2" className="hourlyTime">
                  {timeLabel}
                </Typography>
                <img src={hour.condition.icon} alt={hour.condition.text} className="hourlyIcon" />
                <Typography variant="body2">{hour.temp_c}°C</Typography>
              </motion.div>
            </Grid>
          );
        })}
      </AnimatePresence>
    </Grid>
  );
};

export default HourlyForecast;
