// src/components/WeatherDetails.js
import React from 'react';
import { Grid, Typography } from '@mui/material';

const WeatherDetails = ({ current }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={4}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e0e0e0' }}>
          Wind Speed:
        </Typography>
        <Typography variant="body2">{current.wind_kph} kph</Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e0e0e0' }}>
          Humidity:
        </Typography>
        <Typography variant="body2">{current.humidity}%</Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e0e0e0' }}>
          Pressure:
        </Typography>
        <Typography variant="body2">{current.pressure_mb} mb</Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e0e0e0' }}>
          Visibility:
        </Typography>
        <Typography variant="body2">{current.vis_km} km</Typography>
      </Grid>
      {/* Если нужны дополнительные детали, можно добавить */}
    </Grid>
  );
};

export default WeatherDetails;
