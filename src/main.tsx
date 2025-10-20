import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { ProductProvider } from '../contexts/productContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
        <ProductProvider>
          <App />
        </ProductProvider>
      </NuqsAdapter>
    </BrowserRouter>
  </StrictMode>,
)
