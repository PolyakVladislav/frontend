import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  TableContainer,
} from '@mui/material';
import { motion } from 'framer-motion';
import './WeeklyForecastTable.css';

const WeeklyForecastTable = ({ weather }) => {
  if (!weather.forecast || !weather.forecast.forecastday) return null;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const getDayLabel = (dateStr) => {
    const dateObj = new Date(dateStr);
    if (dateObj.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return dayNames[dateObj.getDay()];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="weeklyForecastContainer"
    >
      <Typography variant="h5" className="weeklyForecastTitle">
        7-Day Forecast
      </Typography>
      <TableContainer component={Paper} className="weeklyTableContainer">
        <Table>
          <TableHead className="weeklyTableHead">
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Temp (°C)</TableCell>
              <TableCell>Wind (kph)</TableCell>
              <TableCell>Precip (mm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weather.forecast.forecastday.map((day) => {
              const label = getDayLabel(day.date);
              return (
                <TableRow
                  key={day.date}
                  component={motion.tr}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="weeklyTableRow"
                >
                  <TableCell className="weeklyTableCell">{label}</TableCell>
                  <TableCell className="weeklyTableCell">
                    <div className="conditionContainer">
                      <img
                        src={day.day.condition.icon}
                        alt={day.day.condition.text}
                        className="conditionIcon"
                      />
                      <span>{day.day.condition.text}</span>
                    </div>
                  </TableCell>
                  <TableCell className="weeklyTableCell">{day.day.avgtemp_c}</TableCell>
                  <TableCell className="weeklyTableCell">{day.day.maxwind_kph}</TableCell>
                  <TableCell className="weeklyTableCell">{day.day.totalprecip_mm}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default WeeklyForecastTable;
