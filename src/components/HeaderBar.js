// src/components/HeaderBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { motion } from 'framer-motion';
import './HeaderBar.css';

const HeaderBar = ({ currentCity, onCityChange, onGeolocation }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      onCityChange(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar position="static" className="headerBar">
      <Toolbar className="toolbar">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h6" className="headerTitle">
            Weather Forecast
          </Typography>
        </motion.div>
        <Box className="searchContainer">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search city..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="searchField customInput" // добавляем customInput
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" onClick={onGeolocation}>
            <MyLocationIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
