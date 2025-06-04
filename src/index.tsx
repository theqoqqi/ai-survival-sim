import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { initI18n } from './i18n';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

initI18n().then(() => {
    root.render(
        <App />
    );
});
