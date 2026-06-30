import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, ShoppingCart, Package, User } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/esplora', label: 'Esplora', Icon: Search },
  { to: '/carrello', label: 'Carrello', Icon: ShoppingCart, badge: true },
  { to: '/ordini', label: 'Ordini', Icon: Package },
  { to: '/profilo', label: 'Profilo', Icon: User },
]

export function BottomNav() {
  const totalItems = useCartStore(state => state.items.reduce((acc, i) => acc + i.quantity, 0))

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-card)] border-t border-[var(--color-border)] bottom-nav">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `
              flex flex-col items-center gap-0.5 flex-1 py-2 relative
              transition-colors duration-150
              ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  {item.badge && totalItems > 0 && (
                    <AnimatePresence>
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-2 bg-[var(--color-primary)] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold"
                      >
                        {totalItems > 9 ? '9+' : totalItems}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-[var(--color-primary)] rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
