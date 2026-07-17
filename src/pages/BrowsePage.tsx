import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import type { Product } from '../types/product'
import './BrowsePage.css'

type FakeStoreProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

function mapFakeStoreProduct(item: FakeStoreProduct): Product {
  return {
    id: String(item.id),
    name: item.title,
    price: item.price,
    description: item.description,
    image: item.image,
  }
}

export function BrowsePage() {
  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error(`Failed to load products (${response.status})`)
        }

        const data: FakeStoreProduct[] = await response.json()
        const nextNine = data.slice(9, 18).map(mapFakeStoreProduct)

        if (!cancelled) {
          setProductList(nextNine)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="browse">
      <header className="browse__header">
        <h1 className="browse__title">Take a look!</h1>
        <p className="browse__subtitle">
          Explore our full collection
        </p>
      </header>

      {isLoading && <p className="browse__status">Loading products…</p>}
      {error && <p className="browse__status browse__status--error">{error}</p>}

      {!isLoading && !error && (
        <div className="browse__grid">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
