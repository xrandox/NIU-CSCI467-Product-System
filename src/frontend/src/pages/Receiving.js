import { useState } from "react";
import axios from "axios"
import authorization from "../components/Auth";

const Receiving = () => {
    const [id, setId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [err, setErr] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page from reloading

        if (!id.match(/^\d+$/)) { // Ensure ID is an int
            setErr("Please enter a valid part number");
            setEmptyFields(["id"]);
            return;
        } else if (!quantity.match(/^\d+$/)) { // Ensure quantity is an int
            setErr("Please enter a valid quantity received");
            setEmptyFields(["quantity"]);
            return;
        }

        // Grab current inventory status from database
        var current_count = 0;
        try {
            const part = (await axios.get("/api/parts/" + id)).data.part;
            current_count = part.quantityAvailable;
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                setErr("Part number not found");
            } else {
                setErr(error.toString());
            }
            return;
        }

        // Increment and update inventory
        try {
            const data = { "quantityTotal": (+quantity) + (+current_count)};
            const resp = await axios.patch("/api/inventory/" + id, data);
            
            setId("");
            setQuantity("");
            setErr(null);
            setEmptyFields([]);
            //TODO: Implement success message(?)
        } catch (error) {
            setErr(error.toString());
        }
    };

    return (
        <form className="add" onSubmit={handleSubmit}>
            <h3>Update Inventory</h3>

            <label>Product ID:</label>
            <input
                type="text"
                onChange={(e) => setId(e.target.value)}
                value={id}
                className={emptyFields.includes("id") ? "error" : ""}
            />
            <label>Quantity Added:</label>
            <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className={emptyFields.includes("quantity") ? "error" : ""}
            />

            <button>Add Product</button>
            {err && <div className="error">{err}</div>}
        </form>
    )
}

export default authorization(Receiving, ["employee", "admin"]);