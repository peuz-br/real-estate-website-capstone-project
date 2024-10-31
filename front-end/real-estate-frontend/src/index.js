import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  
import App from './App';  
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './services/authContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);