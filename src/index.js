import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCCKl3urJSGCWTM8cj9kexqn8zr_XStVFU",
  authDomain: "cart-c8dca.firebaseapp.com",
  projectId: "cart-c8dca",
  storageBucket: "cart-c8dca.appspot.com",
  messagingSenderId: "387722714114",
  appId: "1:387722714114:web:829a34e98a0fc39aa49b1b"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

