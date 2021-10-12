import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./routes";
import ReduxStoreProvider from "./store";
import MuiThemeProvider from "./theme";



ReactDOM.render(
    <React.StrictMode>
        <ReduxStoreProvider>
            <MuiThemeProvider>
            <Routes/>
            </MuiThemeProvider>
        </ReduxStoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


