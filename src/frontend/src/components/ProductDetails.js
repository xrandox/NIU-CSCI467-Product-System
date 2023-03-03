import { useInventoryContext } from "../hooks/useInventoryContext"

const ProductDetails = ({ product }) => {
    const { dispatch } = useInventoryContext()

    const handleClick = async () => {
        const resp = await fetch('/api/inventory/' + product._id, {
            method: 'DELETE'
        })
        const json = await resp.json()

        if (resp.ok) {
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