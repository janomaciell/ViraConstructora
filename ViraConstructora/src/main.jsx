import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { assetUrl } from './lib/media'

// El isotipo se usa como mask-image en CSS, que no puede leer el entorno
document.documentElement.style.setProperty(
  '--isotype-url',
  `url('${assetUrl('img/brand/isotipo.png')}')`,
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
