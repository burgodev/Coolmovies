import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#faaf00',
    },
  },
  typography: {
    h1: {
      fontSize: '4rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '2.5rem',
    },
  },
});
