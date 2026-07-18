import type { Product } from '../types/product'

type DummyJsonProduct = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  images?: string[]
}

type DummyJsonProductList = {
  products: DummyJsonProduct[]
}

function mapDummyJsonProduct(item: DummyJsonProduct): Product {
  return {
    id: String(item.id),
    name: item.title,
    price: item.price,
    description: item.description,
    image: item.thumbnail || item.images?.[0] || '',
  }
}

/** Next 9 products after the first 9 (skip 9, limit 9). */
export async function fetchBrowseProducts(): Promise<Product[]> {
  const response = await fetch(
    'https://dummyjson.com/products?limit=9&skip=9',
  )
  if (!response.ok) {
    throw new Error(`Failed to load products (${response.status})`)
  }

  const data: DummyJsonProductList = await response.json()
  return data.products.map(mapDummyJsonProduct)
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'Product not found'
        : `Failed to load product (${response.status})`,
    )
  }

  const data: DummyJsonProduct = await response.json()
  return mapDummyJsonProduct(data)
}
