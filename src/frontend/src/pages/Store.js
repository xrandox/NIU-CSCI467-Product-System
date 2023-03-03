import { useEffect, useState } from "react";

// Components
import StoreProduct from "../components/StoreProduct";

const Store = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const resp = await fetch("/api/inventory");
      const json = await resp.json();

      if (resp.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="store">
      <div className="products">
        {products &&
          products.map((product) => (
            <StoreProduct key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Store;
