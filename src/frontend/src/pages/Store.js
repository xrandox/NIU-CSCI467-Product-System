import { useEffect, useState } from "react";
import axios from "axios";

// Components
import StoreProduct from "../components/StoreProduct";

const Store = () => {
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
      <div className="products">
        {products &&
          products.map((product) => (
            <StoreProduct key={product.number} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Store;
