import { useEffect, useState } from "react";
import axios from "axios";

import SH_Details from "../components/SH_Details";

const SH_Brackets = () => {
  const [brackets, setBrackets] = useState(null);
  const [newBracket, setNewBracket] = useState(false);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [charge, setCharge] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const flipRefresh = async () => {
    setRefresh(!refresh);
  };

  const handleChargeChange = async (e) => {
    setCharge(e.target.value);
  };

  const handleMinChange = async (e) => {
    setMinWeight(e.target.value);
  };

  const handleMaxChange = async (e) => {
    setMaxWeight(e.target.value);
  };

  const handleAdd = async () => {
    setNewBracket(!newBracket);
    setCharge(0);
    setMinWeight(0);
    setMaxWeight(0);
  };

  const handleDelete = async () => {
    setNewBracket(false);
    setCharge(0);
    setMinWeight(0);
    setMaxWeight(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBracket = {
      minWeight: Number(minWeight),
      maxWeight: Number(maxWeight),
      charge: Number(charge),
    };

    axios
      .post("/api/shbrackets/", newBracket)
      .then((res) => {
        console.log(res);
        handleDelete();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const fetchBrackets = async () => {
      const response = await axios.get("/api/shbrackets/");
      setBrackets(response.data);
    };

    fetchBrackets().catch(console.error);
  }, [newBracket, refresh]);

  return (
    <div>
      <article>
        <center>
          <h1>Shipping and Handling Bracket</h1>
          <div className="products">
            {brackets &&
              brackets.map((shbracket) => (
                <SH_Details
                  key={shbracket._id}
                  shbracket={shbracket}
                  flipRefresh={flipRefresh}
                />
              ))}
          </div>
          {newBracket && (
            <div className="product-detail">
              <form>
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
                <button type="save" className="save-btn" onClick={handleSubmit}>
                  Save
                </button>
                <button
                  type="delete"
                  className="delete-btn"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </form>
            </div>
          )}
          <button onClick={handleAdd}>Add bracket</button>
        </center>
      </article>
    </div>
  );
};

export default SH_Brackets;
