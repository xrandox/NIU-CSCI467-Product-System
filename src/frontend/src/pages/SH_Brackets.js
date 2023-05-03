import React, { useState } from 'react';



const SH_Brackets = () => {
  function DropdownMenu() {
    const [selectedItem, setSelectedItem] = useState('');
  
    const handleSelectChange = (event) => {
      setSelectedItem(event.target.value);
    }
  
    return (
      <div>
        <label htmlFor="dropdown">Select an item:</label>
        <select id="dropdown" value={selectedItem} onChange={handleSelectChange}>
          <option value="">Select an item</option>
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>
        <p>You selected: {selectedItem}</p>
      </div>
    );
  }
  return ( 
      <div>
      <center>
      <h1>This is the SH brackets</h1>
      </center>
      </div>

    
  )
}



export default SH_Brackets;

