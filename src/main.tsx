import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App            from './App.js'
import './index.css'
import './Extensions/string.extensions'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
