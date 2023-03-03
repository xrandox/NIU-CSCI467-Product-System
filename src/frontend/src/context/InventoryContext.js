/**
 * This file provides global inventory context so that we can keep the inventory up-to-date
 * This has nothing to do with the database and is purely to keep the clients state syncronized
 */

import { createContext, useReducer } from "react";

// Create the context
export const InventoryContext = createContext();

// Reducer...Handles dispatch
export const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVENTORY": // If we just set the inventory, the new inventory is all of the products we just fetched
      return {
        inventory: action.payload,
      };
    case "ADD_PRODUCT": // If we just added to the inventory, the new inventory is the old inventory, plus the new product
      return {
        inventory: [action.payload, ...state.inventory],
      };
    case "DELETE_PRODUCT": // If we just deleted from the inventory, the new inventory is the old inventory except the product we deleted
      return {
        inventory: state.inventory.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// Context provider - Wraps the entire app, so inventory context is available everywhere
export const InventoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    inventory: null,
  });

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};
