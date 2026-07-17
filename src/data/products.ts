import type { Product } from '../types/product'

// TODO: Replace with fetch from third-party products API
export const products: Product[] = [
  {
    id: '1',
    name: 'Aurora Keyboard',
    price: 129.99,
    description:
      'A low-profile mechanical keyboard with soft light-blue backlighting and quiet tactile switches.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Aurora+Keyboard',
  },
  {
    id: '2',
    name: 'Nimbus Mouse',
    price: 79.99,
    description:
      'Ergonomic wireless mouse with precision tracking and a rechargeable battery that lasts all week.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Nimbus+Mouse',
  },
  {
    id: '3',
    name: 'Orbit Headphones',
    price: 199.99,
    description:
      'Over-ear headphones with active noise cancellation and rich spatial audio for deep focus sessions.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Orbit+Headphones',
  },
  {
    id: '4',
    name: 'Pulse Desk Lamp',
    price: 59.99,
    description:
      'Adjustable LED desk lamp with warm-to-cool color modes and touch-sensitive brightness control.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Pulse+Lamp',
  },
  {
    id: '5',
    name: 'Cascade Monitor Stand',
    price: 89.99,
    description:
      'Aluminum monitor riser with cable management and a hidden drawer for everyday desk clutter.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Cascade+Stand',
  },
  {
    id: '6',
    name: 'Echo Webcam',
    price: 109.99,
    description:
      '4K webcam with auto-framing, low-light correction, and a built-in privacy shutter.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Echo+Webcam',
  },
  {
    id: '7',
    name: 'Drift Laptop Sleeve',
    price: 39.99,
    description:
      'Slim padded sleeve for 13–15" laptops with a water-resistant finish and soft microfiber lining.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Drift+Sleeve',
  },
  {
    id: '8',
    name: 'Flux USB Hub',
    price: 49.99,
    description:
      'Compact 7-port USB-C hub with HDMI output, SD card reader, and fast charging passthrough.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Flux+Hub',
  },
  {
    id: '9',
    name: 'Vertex Desk Mat',
    price: 34.99,
    description:
      'Extra-large desk mat with a smooth micro-texture surface and stitched edges that stay flat.',
    image: 'https://placehold.co/600x600/1a1d26/7eb6ff?text=Vertex+Mat',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
