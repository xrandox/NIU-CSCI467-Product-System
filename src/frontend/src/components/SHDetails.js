import axios from "axios";
import { useState } from "react";

const SHDetails = (props) => {
  const shbracket = props.shbracket;
  const [minWeight, setMinWeight] = useState(
    shbracket.minWeight.$numberDecimal
  );
  const [maxWeight, setMaxWeight] = useState(
    shbracket.maxWeight.$numberDecimal
  );
  const [charge, setCharge] = useState(shbracket.charge.$numberDecimal);

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
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const route = "/api/shbrackets/" + shbracket._id;

    axios
      .delete(route)
      .then((res) => props.flipRefresh())
      .catch((error) => console.error(error));
  };

  return (
    <div className="block">
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
        <div className="block noborder">
          <button type="save" className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="block noborder">
          <button type="delete" className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default SHDetails;
