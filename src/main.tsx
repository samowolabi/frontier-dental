import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { ProductProvider } from './contexts/productContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </NuqsAdapter>
  </StrictMode>,
)
