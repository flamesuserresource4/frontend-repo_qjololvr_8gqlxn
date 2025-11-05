import { useState } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CheckoutModal from './components/CheckoutModal'
import OwnerDashboard from './components/OwnerDashboard'

function App() {
  const [checkoutProduct, setCheckoutProduct] = useState(null)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/20 bg-white/70">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400" />
            <span className="font-bold">HoloPay Store</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#products" className="hover:opacity-70">Products</a>
            <a href="#dashboard" className="hover:opacity-70">Dashboard</a>
          </nav>
        </div>
      </header>

      <Hero />
      <ProductGrid onCheckout={(p)=> setCheckoutProduct(p)} />
      <OwnerDashboard />

      {checkoutProduct && (
        <CheckoutModal product={checkoutProduct} onClose={() => setCheckoutProduct(null)} />
      )}

      <footer className="py-10 text-center text-sm text-gray-500">
        Built for demo purposes. Crypto payments simulated via webhook in sandbox.
      </footer>
    </div>
  )
}

export default App
