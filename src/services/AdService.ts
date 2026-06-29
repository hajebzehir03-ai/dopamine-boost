import { ADS_CONFIG } from '@/config/ads'

let purchaseCount = 0

export const AdService = {
  recordPurchase(): void {
    purchaseCount++
  },

  shouldShowInterstitial(): boolean {
    return purchaseCount % ADS_CONFIG.purchasesBeforeInterstitial === 0 && purchaseCount > 0
  },

  async showBanner(): Promise<void> {
    console.log('[AdService] Banner ad:', ADS_CONFIG.banner.android)
  },

  async showInterstitial(): Promise<void> {
    console.log('[AdService] Interstitial ad:', ADS_CONFIG.interstitial.android)
  },

  async showRewarded(): Promise<boolean> {
    console.log('[AdService] Rewarded ad:', ADS_CONFIG.rewarded.android)
    return true
  },
}
