import { useEffect } from 'react'
import ProductGrid from '../../components/products/ProductGrid'
import { fetchProducts } from '../../services/api/products.api'
import { useProductContext } from '../../contexts/productContext'

const Home = () => {
  const { dispatch } = useProductContext();

  // Fetch products on component mount and update context
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

  return <ProductGrid />;
};

export default Home;