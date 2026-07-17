import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
  return (
    <section className="home">
      <h1 className="home__title">Welcome to FrontendFuture</h1>
      <p className="home__blurb">
        Your destination for all cool tech gadgets and essentials. Build out the gamer's dream desk setup, pick out stylish attire to look and feel like a boss...and so much more! 
        We offer the best quality items at knockout prices. 
        Shop with ease...click click ship!
      </p>
      <div className="home__actions">
        <Link to="/browse" className="btn btn--primary">
          Browse Products
        </Link>
        <Link to="/cart" className="btn btn--ghost">
          View Cart
        </Link>
      </div>
    </section>
  )
}
