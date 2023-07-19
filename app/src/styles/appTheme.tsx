import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#A60E7B'
    },
    secondary: {
      main: '#ca6eb0'
    },
    background: {
      default: '#ededed'
    },
    tertiary: {
      main: '#1a90ff'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});
