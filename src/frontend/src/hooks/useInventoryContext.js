import { InventoryContext } from "../context/InventoryContext";
import { useContext } from "react";

export const useInventoryContext = () => {
    const context = useContext(InventoryContext)

    if (!context) {
        throw Error('Inventory Context must be used inside of the Inventory Context Provider')
    }

    return context
}