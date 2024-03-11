import React from 'react';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { AuthContextProvider } from './contexts/AuthContext';
import { getFirestore } from "firebase/firestore";
import { FirestoreContextProvider } from './contexts/FirestoreContext';
import { StorageContextProvider } from './contexts/StorageContext';
import { ThemeContextProvider } from './contexts/ThemeContext.tsx';
import { getStorage } from "firebase/storage";
import { getPerformance } from "firebase/performance";
import { createRoot } from 'react-dom/client';


export const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBx5iO2zA3DnWx7swuU6uvJFTnUo48GztE",
  authDomain: "portfolio-breydonb.firebaseapp.com",
  projectId: "portfolio-breydonb",
  storageBucket: "gs://portfolio-breydonb.appspot.com",
  messagingSenderId: "395264269390",
  appId: "1:395264269390:web:2d9bf8d4ddc24a6977371f",
  measurementId: "G-P821T6KLCS"
});

export const auth = getAuth(firebaseConfig);
export const db = getFirestore(firebaseConfig);
export const storage = getStorage(firebaseConfig);
export const performanceMetrics = getPerformance(firebaseConfig)

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
      <FirestoreContextProvider>
        <StorageContextProvider>
          <AuthContextProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </AuthContextProvider>
        </StorageContextProvider>
      </FirestoreContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
