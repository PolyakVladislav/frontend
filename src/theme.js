import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderRadius: '4px',
          input: {
            color: '#f0f0f0',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderRadius: '4px',
          color: '#f0f0f0',
        },
      },
    },
  },
});

export default theme;
