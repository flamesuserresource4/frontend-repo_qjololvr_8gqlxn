import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductGrid({ onCheckout }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <section id="products" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          <div className="text-gray-500">Loading products...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        {products.length === 0 ? (
          <div className="rounded-md border border-dashed p-8 text-center text-gray-600">
            No products yet. Use the owner dashboard below to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p, idx) => (
              <div key={idx} className="rounded-xl border bg-white shadow-sm overflow-hidden flex flex-col">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{p.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-bold">${p.price_usd?.toFixed ? p.price_usd.toFixed(2) : p.price_usd}</span>
                    <button onClick={() => onCheckout(p)} className="px-3 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-90">Buy with Crypto</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
