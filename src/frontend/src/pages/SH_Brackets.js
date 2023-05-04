import { useEffect, useState } from "react";
import axios from "axios";

import SH_Details from "../components/SH_Details";

const SH_Brackets = () => {
  const [brackets, setBrackets] = useState(null);

  useEffect(() => {
    const fetchBrackets = async () => {
      const response = await axios.get("/api/shbrackets/");
      setBrackets(response.data);
    };

    fetchBrackets().catch(console.error);
  }, []);

  return (
    <div>
      <article>
        <center>
          <h1>Shipping and Handling Bracket</h1>
          <div className="products">
            {brackets &&
              brackets.map((shbracket) => (
                <SH_Details key={shbracket._id} shbracket={shbracket} />
              ))}
          </div>
        </center>
      </article>
    </div>
  );
};

export default SH_Brackets;
