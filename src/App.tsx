import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CartProvider } from './context/CartContext'
import { BrowsePage } from './pages/BrowsePage'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import './App.css'

function Layout() {
  return (
    <>
      <Navbar />
      <div className="app">
        <main className="app__main">
          <Outlet />
        </main>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
