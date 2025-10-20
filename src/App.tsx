import { Routes, Route } from 'react-router-dom'
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
    </>
  )
}

export default App
