import { useEffect } from "react";
import { useInventoryContext } from "../../hooks/useInventoryContext";
// Components
import ProductDetails from "../../components/ProductDetails";
import ProductForm from "../../components/ProductForm";
import authorization from "../../components/Auth";

const Inventory = () => {
  const { inventory, dispatch } = useInventoryContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const resp = await fetch("/api/parts");
      const json = await resp.json();

      if (resp.ok) {
        dispatch({ type: "SET_INVENTORY", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="store">
      <div className="products">
        {inventory &&
          inventory.map((product) => (
            <ProductDetails key={product.number} product={product} />
          ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default authorization(Inventory, ["admin", "employee"]);
