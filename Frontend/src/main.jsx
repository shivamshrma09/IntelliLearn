import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { UserProvider } from './context/UserContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NextUIProvider>
  </React.StrictMode>,
)