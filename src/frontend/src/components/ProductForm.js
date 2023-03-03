/**
 * This file contains the code for our product form that is shown in the inventory page
 * Used to add new products to the inventory
 */

import { useState } from "react"
import { useInventoryContext } from "../hooks/useInventoryContext"

const ProductForm = () => {
    // Use context to keep the inventory up-to-date
    const { dispatch } = useInventoryContext()

    // Setting states
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [err, setErr] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // Handle when the user clicks submit
    const handleSubmit = async (e) => {
        e.preventDefault() //prevent page from reloading

        const product = {name, quantity}

        const resp = await fetch('/api/inventory', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await resp.json()

        if (!resp.ok) { // If we get an error, send the error json and the empty fields so we can highlight them
            setErr(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (resp.ok) { // If we successfully add the product, reset fields, log it, and update the inventory context
            setName('')
            setQuantity('')
            setErr(null)
            setEmptyFields([])
            console.log('New Product Added', json)
            dispatch({type: 'ADD_PRODUCT', payload: json})
        }
    }

    return (
        <form className="add" onSubmit={handleSubmit}>
            <h3>Add a New Product</h3>

            <label>Product Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Quantity Available:</label>
            <input 
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className={emptyFields.includes('quantity') ? 'error' : ''}
            />

            <button>Add Product</button>
            {err && <div className="error">{err}</div>}
        </form>
    )
}

export default ProductForm