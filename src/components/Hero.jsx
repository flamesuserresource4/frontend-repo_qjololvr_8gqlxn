import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
          Sell digital goods with crypto
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80">
          A sleek, automated checkout with on-chain payments and a simple owner dashboard.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <a href="#products" className="px-5 py-3 rounded-lg bg-white text-black font-semibold shadow hover:shadow-lg transition">Start Shopping</a>
          <a href="#dashboard" className="px-5 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition">Owner Dashboard</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
    </section>
  )
}
