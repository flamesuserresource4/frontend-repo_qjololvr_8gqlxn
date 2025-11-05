import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function OwnerDashboard() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)

  const loadSummary = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/summary`)
      const data = await res.json()
      setSummary(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadSummary()
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, price_usd: parseFloat(price || '0'), image_url: image, active: true })
      })
      setTitle(''); setPrice(''); setDesc(''); setImage('')
      await loadSummary()
      alert('Product created')
    } catch (e) {
      console.error(e)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="dashboard" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Owner Dashboard</h2>
          <button onClick={loadSummary} className="text-sm px-3 py-1.5 rounded-md border bg-white">Refresh</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Create Product</h3>
            <form onSubmit={onCreate} className="space-y-3">
              <input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Title" className="w-full rounded-md border px-3 py-2" />
              <input value={price} onChange={e=>setPrice(e.target.value)} required type="number" min="0" step="0.01" placeholder="Price (USD)" className="w-full rounded-md border px-3 py-2" />
              <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL (optional)" className="w-full rounded-md border px-3 py-2" />
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full rounded-md border px-3 py-2" rows={3} />
              <button disabled={loading} className="w-full rounded-md bg-black text-white py-2 font-semibold">{loading ? 'Creating...' : 'Create Product'}</button>
            </form>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Stats</h3>
            {!summary ? (
              <div className="text-gray-500 text-sm">Loading...</div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span>Total Products</span><b>{summary.total_products}</b></div>
                <div className="flex items-center justify-between"><span>Total Orders</span><b>{summary.total_orders}</b></div>
                <div className="flex items-center justify-between"><span>Total Revenue</span><b>${summary.total_revenue?.toFixed ? summary.total_revenue.toFixed(2) : summary.total_revenue}</b></div>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm md:col-span-1">
            <h3 className="font-semibold mb-4">Recent Orders</h3>
            {!summary ? (
              <div className="text-gray-500 text-sm">Loading...</div>
            ) : (
              <div className="space-y-3">
                {summary.recent_orders?.length ? summary.recent_orders.map((o, i) => (
                  <div key={i} className="rounded-md border p-3 text-sm">
                    <div className="font-semibold">{o.product_title}</div>
                    <div className="text-gray-600">${'{'}o.amount_usd{'}'} paid in {"${o.currency}"}</div>
                  </div>
                )) : <div className="text-sm text-gray-500">No orders yet.</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
