import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function HomeIcon() {
  return (
    <svg className="navbar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.2 3.5 10.3c-.3.3-.4.7-.3 1.1.1.4.4.7.8.8H6v7.3c0 .6.4 1 1 1h3.5v-5h3v5H17c.6 0 1-.4 1-1V12.2h1.9c.4 0 .7-.3.8-.7.1-.4 0-.8-.3-1.1L12 3.2Z"
      />
    </svg>
  )
}

function BrowseIcon() {
  return (
    <svg className="navbar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h3A1.5 1.5 0 0 1 10 5.5v3A1.5 1.5 0 0 1 8.5 10h-3A1.5 1.5 0 0 1 4 8.5v-3Zm10 0A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 14 8.5v-3ZM4 15.5A1.5 1.5 0 0 1 5.5 14h3a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3Zm10 0a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Z"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg className="navbar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6.2 5l.4 2H20a1 1 0 0 1 1 1.1l-.8 5.2A2.5 2.5 0 0 1 17.7 15H9.2a2.5 2.5 0 0 1-2.5-2.1L5.2 4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 .8L7.2 5Zm2.9 8.5c.1.3.4.5.7.5h8.5c.3 0 .6-.2.7-.5l.6-3.5H8.1l.9 3.5Z"
      />
    </svg>
  )
}

export function Navbar() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand" end>
          FrontendFuture
        </NavLink>
        <nav className="navbar__links" aria-label="Main">
          <NavLink to="/" className="navbar__link" end>
            <span className="navbar__link-label">Home</span>
            <HomeIcon />
          </NavLink>
          <NavLink to="/browse" className="navbar__link">
            <span className="navbar__link-label">
              Browse<span className="navbar__link-extra"> Products</span>
            </span>
            <BrowseIcon />
          </NavLink>
          <NavLink to="/cart" className="navbar__link navbar__cart-link">
            <span className="navbar__link-label">
              Cart
              {itemCount > 0 && (
                <span
                  className="navbar__cart-count"
                  aria-label={`${itemCount} items in cart`}
                >
                  {itemCount}
                </span>
              )}
            </span>
            <CartIcon />
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
