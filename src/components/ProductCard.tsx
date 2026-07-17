import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'
import './ProductCard.css'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { items } = useCart()
  const cartQuantity =
    items.find((item) => item.id === product.id)?.quantity ?? 0

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <div className="product-card__body">
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
      {cartQuantity > 0 && (
        <span
          className="product-card__banner"
          aria-label={`${cartQuantity} in cart`}
        >
          In cart · {cartQuantity}
        </span>
      )}
    </Link>
  )
}
