// GDPR NOTE: Before enabling real AdMob calls, integrate IAB TCF 2.0 consent
// (e.g. Google UMP SDK) and gate all ad calls behind a valid consent string.
// No ads must fire without explicit user consent in EEA/UK jurisdictions.
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
    // Replace with real AdMob call: AdMob.showBanner({ adId: ADS_CONFIG.banner.android })
  },

  async showInterstitial(): Promise<void> {
    // Replace with real AdMob call: AdMob.prepareInterstitial({ adId: ADS_CONFIG.interstitial.android })
  },

  async showRewarded(): Promise<boolean> {
    // Replace with real AdMob call: AdMob.prepareRewardVideoAd({ adId: ADS_CONFIG.rewarded.android })
    return true
  },
}
