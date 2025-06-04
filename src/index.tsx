import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/index';
import App from './components/App';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
    <App />
);
