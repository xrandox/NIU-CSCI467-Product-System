

const SH_Brackets = () => {
  return ( 
      <div>
      <article>
      <center>
      <h1> Add a New Shipping and Handling Bracket</h1>
      <label htmlFor="minweight">Minimum Weight</label>
      <input type="minweight" id="minweight"/>
      <label htmlFor="maxweight">Maximum Weight</label>
      <input type="maxweight" id="maxweight"/>
      <label htmlFor="price">Price</label>
      <input type="price" id="price"/>
      <button type="save" className="save-btn"> Save</button>
      <button type="delete" className="delete-btn">Delete</button>
      </center>
      </article>
      </div>
      

    
  )
};




export default SH_Brackets;


