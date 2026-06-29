export const NotificationService = {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false
    const result = await Notification.requestPermission()
    return result === 'granted'
  },

  async scheduleOrderNotification(orderId: string, status: string, delayMs: number): Promise<void> {
    const granted = await this.requestPermission()
    if (!granted) return

    setTimeout(() => {
      const messages: Record<string, string> = {
        spedito: `Il tuo ordine ${orderId} è stato spedito! 🚚`,
        consegna: `Il tuo ordine ${orderId} è in consegna! 🏘️`,
        consegnato: `Il tuo ordine ${orderId} è stato consegnato! 🎉`,
      }
      const body = messages[status] || `Aggiornamento ordine ${orderId}`
      new Notification('CartRush ⚡', { body, icon: '/favicon.svg' })
    }, delayMs)
  },
}
