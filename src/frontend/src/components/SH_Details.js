import axios from "axios";
import { useState } from "react";

const SH_Details = ({ shbracket }) => {
  const [minWeight, setMinWeight] = useState(
    shbracket.minWeight.$numberDecimal
  );
  const [maxWeight, setMaxWeight] = useState(
    shbracket.maxWeight.$numberDecimal
  );
  const [charge, setCharge] = useState(shbracket.charge.$numberDecimal);
  const [id, setID] = useState("");
  //...

  const handleChargeChange = async (e) => {
    setCharge(e.target.value);
  };

  const handleMinChange = async (e) => {
    setMinWeight(e.target.value);
  };

  const handleMaxChange = async (e) => {
    setMaxWeight(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const bracket = { minWeight, maxWeight, charge };
    const route = "/api/shbrackets/" + shbracket._id;
    axios
      .patch(route, bracket)
      .then()
      .catch((error) => console.error(error));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="product-detail">
      <form id={shbracket._id}>
        <label htmlFor="minweight">Minimum Weight</label>
        <input
          type="minweight"
          id="minweight"
          value={minWeight}
          onChange={handleMinChange}
        />
        <label htmlFor="maxweight">Maximum Weight</label>
        <input
          type="maxweight"
          id="maxweight"
          value={maxWeight}
          onChange={handleMaxChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="price"
          id="price"
          value={charge}
          onChange={handleChargeChange}
        />
        <button type="save" className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button type="delete" className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default SH_Details;
