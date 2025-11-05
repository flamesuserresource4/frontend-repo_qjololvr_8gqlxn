import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CheckoutModal({ product, onClose }) {
  const [intent, setIntent] = useState(null)
  const [status, setStatus] = useState('pending')
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!product) return
    async function createIntent() {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product._id || '', currency: 'USDC', buyer_email: email || undefined })
      })
      const data = await res.json()
      setIntent(data)
    }
    createIntent()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  useEffect(() => {
    if (!intent?.intent_id) return
    const id = setInterval(async () => {
      const res = await fetch(`${API_BASE}/payments/${intent.intent_id}`)
      const data = await res.json()
      setStatus(data.status)
    }, 3000)
    return () => clearInterval(id)
  }, [intent])

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">Checkout</h3>
            <p className="text-sm text-gray-600">{product.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {!intent ? (
          <div className="mt-6 text-gray-500">Generating payment details...</div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="font-semibold">{intent.amount_crypto} {intent.currency}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">Send to</span>
                <code className="text-xs break-all">{intent.address}</code>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => { navigator.clipboard.writeText(intent.address); setCopied(true); setTimeout(()=>setCopied(false), 1500) }}
                  className="px-3 py-1.5 rounded-md bg-black text-white text-xs font-semibold"
                >{copied ? 'Copied!' : 'Copy Address'}</button>
                <button
                  onClick={async () => {
                    // Demo webhook to mark as paid
                    await fetch(`${API_BASE}/webhook/mock/crypto`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ intent_id: intent.intent_id, secret: 'demo-secret' }) })
                    const res = await fetch(`${API_BASE}/payments/${intent.intent_id}`)
                    const data = await res.json()
                    setStatus(data.status)
                  }}
                  className="px-3 py-1.5 rounded-md border text-xs font-semibold"
                >Simulate Payment</button>
              </div>
            </div>

            <div className={`rounded-md px-3 py-2 text-sm ${status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              {status === 'confirmed' ? 'Payment confirmed. Your order has been created.' : 'Waiting for payment confirmation...'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
