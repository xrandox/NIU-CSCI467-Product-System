import { useInventoryContext } from "../hooks/useInventoryContext";

const SH_Details = ({ product }) => {
  // Using context to keep the products updated
  const { dispatch } = useInventoryContext();

  // Handle the user clicking the delete button
  const handleClick = async () => {
    const resp = await fetch("/api/inventory/" + product._id, {
      method: "DELETE",
    });
    const json = await resp.json();

    if (resp.ok) {
      //if we successfully delete the product, update the context
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="SH-details">
      

    </div>
  );
  };

  
  export default SH_Details;

