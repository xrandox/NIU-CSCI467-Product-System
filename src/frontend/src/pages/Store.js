import { useEffect, useState } from "react";
import axios from "axios";
import "./Store.css";

// Components
import StoreProduct from "../components/StoreProduct";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";

const Store = () => {

  // search bar functionality
  const [results, setResults] = useState([]);
  // end search bar functionality

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/parts/");
      setProducts(response.data);
    };

    fetchProducts().catch(console.error);
  }, []);

  return (
    <div className="store">
        <div className="home">
            <div className="search-bar-container">
                <SearchBar setResults={setResults}/>
                <SearchResultsList results={results}/>
                <div className="products">
                    {products &&
                    products.map((product) => (
                    <StoreProduct key={product.number} product={product} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Store;
