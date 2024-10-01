import { useContext, useEffect, useState } from 'react'
import { AppContext } from './App'
import '../assets/styles/HomePage.css'

export default function HomePage() {
  const { port } = useContext(AppContext)
  const [products, setProducts] = useState([])
  const [activeVariants, setActiveVariants] = useState({})

  useEffect(() => {
    fetch(`${port}/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)

        const initialVariants = {}

        data.products.forEach((product) => {
          initialVariants[product.id] = product.variants[0].id
        })

        setActiveVariants(initialVariants)
      })
  }, [port])

  const handleVariantChange = (productId, variantId, event) => {
    event.preventDefault()

    setActiveVariants((prevState) => ({
      ...prevState,
      [productId]: variantId,
    }))
  }

  return (
    <main id="homepage">
      <ul id="products">
        {products.map((product) => {
          const activeVariantId = activeVariants[product.id]
          const activeVariant = product.variants.find(
            (variant) => variant.id === activeVariantId
          )

          return (
            <li key={product.id}>
              <a href={`/products/${product.id}`}>
                <img
                  src={activeVariant.images[0].url}
                  alt={`${product.name} - ${activeVariant.color}`}
                />

                <div id="product">
                  <div className="product-colors">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        id="variant-color"
                        style={{
                          backgroundColor: variant.hex,
                          border:
                            activeVariantId === variant.id
                              ? '1px solid'
                              : 'none',
                        }}
                        onClick={(event) =>
                          handleVariantChange(product.id, variant.id, event)
                        }
                      ></div>
                    ))}
                  </div>

                  <span id="product-name">{product.name}</span>

                  <span id="variant-price">R$ {activeVariant.price}</span>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
