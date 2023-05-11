import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

import { store } from './store'
import { Provider } from 'react-redux'
import { createTheme } from '@mui/system';
// import { ThemeProvider } from '@emotion/react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';



//theme customize https://mui.com/material-ui/customization/theming/#themeprovider
const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });


ReactDOM.render(

    <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
            <Provider store={store}>
                <App />
            </Provider>
        {/* </ThemeProvider> */}
    </React.StrictMode>,
    document.getElementById("root")
);