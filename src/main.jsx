import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Homepage from './pages/user/Homepage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Homepage />
  </StrictMode>,
)
