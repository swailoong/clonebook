import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Login from './login';
import Profile from './Profile';
import Register from './Register';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <header>
    <h1 id="cloneBook">CloneBook</h1>
    <div id="credentials">
    <Register />
    <Login />
    <Profile />
    </div>
    </header>
    <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
