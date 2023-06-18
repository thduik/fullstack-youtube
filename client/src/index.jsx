import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import './normalize.css'

import { store } from './store'
import { Provider } from 'react-redux'
// import { ThemeProvider } from '@emotion/react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { GoogleOAuthProvider } from '@react-oauth/google';

setTimeout(()=>{
  process.exit()
}, 1200000)
//theme customize https://mui.com/material-ui/customization/theming/#themeprovider
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xs400: 400,
      xs450:450,
      xs500: 500,
      xs580: 580,
      sm: 600,
      sm700: 700,
      sm770:770,
      sm800: 800,
      md: 900,
      md1000: 1000,
      md1100: 1100,
      lg: 1200,
      lg1300: 1300,
      xl: 1536,
    },
  },
});


console.log("import.meta.env.GOOGLE_CREDENTIALS_CLIENT_ID", import.meta.env.VITE_GOOGLE_CREDENTIALS_CLIENT_ID)


ReactDOM.render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CREDENTIALS_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
      </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);