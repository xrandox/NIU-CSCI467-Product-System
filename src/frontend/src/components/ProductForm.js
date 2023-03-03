import { useState } from "react"
import { useInventoryContext } from "../hooks/useInventoryContext"

const ProductForm = () => {
    const { dispatch } = useInventoryContext()

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [err, setErr] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = {name, quantity}

        const resp = await fetch('/api/inventory', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await resp.json()

        if (!resp.ok) {
            setErr(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (resp.ok) {
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