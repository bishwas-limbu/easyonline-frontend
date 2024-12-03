

import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import ShopContextProvider from './Context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
    }}
  >
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
)
