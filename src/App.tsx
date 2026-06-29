import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { BottomNav } from '@/components/common/BottomNav'
import { HomePage } from '@/pages/HomePage'
import { EsploraPage } from '@/pages/EsploraPage'
import { ProductPage } from '@/pages/ProductPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { TrackingPage } from '@/pages/TrackingPage'
import { SettingsPage } from '@/pages/SettingsPage'

const HIDE_NAV_ROUTES = ['/conferma/', '/checkout']

export function App() {
  const location = useLocation()
  const hideNav = HIDE_NAV_ROUTES.some((r) => location.pathname.startsWith(r))

  return (
    <div className="min-h-screen bg-[var(--color-background)] max-w-lg mx-auto relative">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/esplora" element={<EsploraPage />} />
          <Route path="/prodotto/:id" element={<ProductPage />} />
          <Route path="/carrello" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/conferma/:id" element={<OrderConfirmationPage />} />
          <Route path="/ordini" element={<OrdersPage />} />
          <Route path="/tracking/:id" element={<TrackingPage />} />
          <Route path="/profilo" element={<SettingsPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="text-5xl">🛒</p>
              <p className="font-bold text-[var(--color-text)] text-xl">Pagina non trovata</p>
              <a href="/" className="text-sm text-[var(--color-primary)] underline">Torna allo shopping →</a>
            </div>
          } />
        </Routes>
      </AnimatePresence>

      {!hideNav && <BottomNav />}
    </div>
  )
}
