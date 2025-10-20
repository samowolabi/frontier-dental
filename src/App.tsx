import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Header from '../components/layout/Header'
import Home from './pages/Home'
import AdminProductManagement from './pages/admin/ProductManagement'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/products" element={<AdminProductManagement />} />
      </Routes>
      
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: 'none'
          },
          success: {
            iconTheme: {
              primary: '#2DD4BF',
              secondary: '#ffffff',
            },
            style: {
              background: '#F0FDFA',
              color: '#0D9488',
              border: '0.7px solid #2DD4BF',
            }
          },
          error: {
            iconTheme: {
              primary: '#E11D48',
              secondary: '#ffffff',
            },
            style: {
              background: '#FFF1F2',
              color: '#E11D48',
              border: '0.7px solid #E11D48',
            }
          }
        }}
      />
    </>
  )
}

export default App
