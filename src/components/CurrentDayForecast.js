import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import HourlyForecast from './HourlyForecast';
import WeatherDetails from './WeatherDetails';
import { motion } from 'framer-motion';
import './CurrentDayForecast.css';

const CurrentDayForecast = ({ weather }) => {
  const { location, current } = weather;
  const dateOptions = { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric' };
  const dateStr = new Date(location.localtime).toLocaleDateString(undefined, dateOptions);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="currentForecastContainer"
    >
      <Card className="glassCard currentCard">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {dateStr} {location.name}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h3" className="tempValue">
                {current.temp_c}°C
              </Typography>
              <Typography variant="h6">
                Feels like {current.feelslike_c}°C
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {current.condition.text}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="iconContainer">
              <img src={current.condition.icon} alt={current.condition.text} className="currentIcon" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className="glassCard detailsCard">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>
          <WeatherDetails current={current} />
        </CardContent>
      </Card>

      <Card className="glassCard hourlyCard">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Hourly Forecast
          </Typography>
          <HourlyForecast location={location} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CurrentDayForecast;
