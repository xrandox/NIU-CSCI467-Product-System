/**
 * This file contains the code for the product details component that is shown on both the inventory and store pages
 */

import { useInventoryContext } from "../hooks/useInventoryContext"

const ProductDetails = ({ product }) => {
    // Using context to keep the products updated
    const { dispatch } = useInventoryContext()

    // Handle the user clicking the delete button
    const handleClick = async () => {
        const resp = await fetch('/api/inventory/' + product._id, {
            method: 'DELETE'
        })
        const json = await resp.json()

        if (resp.ok) { //if we successfully delete the product, update the context
            dispatch({type: 'DELETE_PRODUCT', payload: json})
        }
    }

    return (
        <div className="product-details">
            <h4>{product.name}</h4>
            <p><strong>Available: </strong>{product.quantity}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default ProductDetails