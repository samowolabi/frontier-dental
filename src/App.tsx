import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/layout/Header'
import ProductGrid from './components/products/ProductGrid'
import { fetchProducts } from './services/api/products.api'
import { useProductContext } from './contexts/productContext'

function App() {
  const { dispatch } = useProductContext();

  useEffect(() => {
    const getProducts = async () => {
      // Set loading to true before fetching
      dispatch({ type: "SET_LOADING", payload: { loading: true } });
      
      // Fetch products from the API
      const products = await fetchProducts();
      dispatch({ type: "SET_PRODUCTS", payload: { products } });

      // Set loading to false after fetching
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    };

    getProducts();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ProductGrid />
    </>
  )
}

export default App
