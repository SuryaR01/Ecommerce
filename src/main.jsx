import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Contentprovider } from './Multipages/CartContext/Context.jsx';

createRoot(document.getElementById('root')).render(
  <Contentprovider>
    <App />
  </Contentprovider>,
)
