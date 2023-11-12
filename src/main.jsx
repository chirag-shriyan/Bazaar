import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Mui.css'
import { BrowserRouter } from 'react-router-dom'
import RootContextProvider from './contexts/RootContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <RootContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootContextProvider>
  //</React.StrictMode>,
)
