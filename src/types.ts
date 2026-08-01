export type SceneId = 
  | 'lock'         // Fingerprint scanner
  | 'scene1_heart'  // Glowing beating heart + petal bloom
  | 'scene2_memory' // Falling photos + memory cards
  | 'scene3_stars'  // Constellation connection ("I Love You")
  | 'scene4_quotes' // Romantic music + word-by-word quote reveal
  | 'scene5_letter' // Floating 3D envelope + unfolding love letter
  | 'scene6_gift'   // Gift box shake/tap to reveal surprise coupons
  | 'scene_final';  // Moon, fireflies, "Hold my hand", fireworks

export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  location?: string;
  caught?: boolean;
}

export interface RomanticQuote {
  id: string;
  quote: string;
  author?: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface AppCustomization {
  herName: string;
  senderName: string;
  specialDate: string;
  letterText: string;
  giftBoxMessage: string;
  giftCoupons: LoveCoupon[];
  photos: MemoryPhoto[];
  quotes: RomanticQuote[];
  enableAudioSynthesizer: boolean;
}
