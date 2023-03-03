import { useEffect, useState } from "react"

// Components
import ProductDetails from '../components/ProductDetails'

const Store = () => {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const resp = await fetch('/api/inventory')
            const json = await resp.json()

            if (resp.ok) {
                setProducts(json)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="store">
            <div className="products">
                {products && products.map((product) => (
                    <ProductDetails key={product._id} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default Store