import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./routes";
import ReduxStoreProvider from "./store";


ReactDOM.render(
    <React.StrictMode>
        <ReduxStoreProvider>
            <Routes/>
        </ReduxStoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


