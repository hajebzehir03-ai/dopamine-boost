import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { BottomNav } from '@/components/common/BottomNav'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const EsploraPage = lazy(() => import('@/pages/EsploraPage').then(m => ({ default: m.EsploraPage })))
const ProductPage = lazy(() => import('@/pages/ProductPage').then(m => ({ default: m.ProductPage })))
const CartPage = lazy(() => import('@/pages/CartPage').then(m => ({ default: m.CartPage })))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })))
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })))
const OrdersPage = lazy(() => import('@/pages/OrdersPage').then(m => ({ default: m.OrdersPage })))
const TrackingPage = lazy(() => import('@/pages/TrackingPage').then(m => ({ default: m.TrackingPage })))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })))

const HIDE_NAV_ROUTES = ['/conferma/', '/checkout']

export function App() {
  const location = useLocation()
  const hideNav = HIDE_NAV_ROUTES.some((r) => location.pathname.startsWith(r))

  return (
    <div className="min-h-screen bg-[var(--color-background)] max-w-lg mx-auto relative" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <Suspense fallback={<LoadingSpinner />}>
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
                <p className="font-bold text-[var(--color-text)] text-xl">Pagina non trovata</p>
                <a href="/" className="text-sm text-[var(--color-primary)] underline">Torna allo shopping →</a>
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {!hideNav && <BottomNav />}
    </div>
  )
}
