import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'
import './ProductPage.css'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem, updateQuantity, items } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cartQuantity =
    items.find((item) => item.id === product?.id)?.quantity ?? 0

  useEffect(() => {
    if (!id) {
      setProduct(null)
      setIsLoading(false)
      setError('Missing product id')
      return
    }

    let cancelled = false

    async function loadProduct() {
      try {
        setIsLoading(true)
        setError(null)

        const nextProduct = await fetchProductById(id!)
        if (!cancelled) {
          setProduct(nextProduct)
        }
      } catch (err) {
        if (!cancelled) {
          setProduct(null)
          setError(err instanceof Error ? err.message : 'Failed to load product')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadProduct()

    return () => {
      cancelled = true
    }
  }, [id])

  function handleAddToCart() {
    if (!product) return
    addItem(product)
  }

  function handleBuyNow() {
    if (!product) return
    navigate('/cart', { state: { buyNow: product } })
  }

  if (isLoading) {
    return (
      <section className="product-page product-page--empty">
        <p>Loading product…</p>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="product-page product-page--empty">
        <h1>Product not found</h1>
        <p>{error ?? 'We couldn’t find a product with that id.'}</p>
        <Link to="/browse" className="btn btn--primary">
          Back to browse
        </Link>
      </section>
    )
  }

  return (
    <section className="product-page">
      <Link to="/browse" className="product-page__back">
        ← Back to products
      </Link>
      <div className="product-page__media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-page__details">
        <h1 className="product-page__title">{product.name}</h1>
        <p className="product-page__price">${product.price.toFixed(2)}</p>
        <p className="product-page__description">{product.description}</p>
        <div className="product-page__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleBuyNow}
          >
            Buy now
          </button>
        </div>
        {cartQuantity > 0 && (
          <div className="product-page__in-cart">
            <p className="product-page__feedback">
              This item is already in your cart.
            </p>
            <div className="product-page__qty">
              <button
                type="button"
                className="product-page__qty-btn"
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(product.id, cartQuantity - 1)}
              >
                −
              </button>
              <span className="product-page__qty-value">{cartQuantity}</span>
              <button
                type="button"
                className="product-page__qty-btn"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(product.id, cartQuantity + 1)}
              >
                +
              </button>
            </div>
            <Link to="/cart" className="product-page__cart-link">
              View cart
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
