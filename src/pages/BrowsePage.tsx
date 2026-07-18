import { useEffect, useState } from 'react'
import { fetchBrowseProducts } from '../api/products'
import { ProductCard } from '../components/ProductCard'
import type { Product } from '../types/product'
import './BrowsePage.css'

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

        const products = await fetchBrowseProducts()
        if (!cancelled) {
          setProductList(products)
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
        <p className="browse__subtitle">Explore our full collection</p>
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
