import { useState } from "react";

const SH_Details = ({ shbracket }) => {
  const [minWeight, setMinWeight] = useState("");
  //...

  const handleSave = async (e) => {
    e.preventDefault();

    const bracket = { minWeight };
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
          value={shbracket.minWeight.$numberDecimal}
          onChange={(e) => setMinWeight(e.target.value)}
        />
        <label htmlFor="maxweight">Maximum Weight</label>
        <input
          type="maxweight"
          id="maxweight"
          value={shbracket.maxWeight.$numberDecimal}
        />
        <label htmlFor="price">Price</label>
        <input
          type="price"
          id="price"
          value={shbracket.charge.$numberDecimal}
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
