import { AppCustomization } from '../types';
import carSelfieImg from '../assets/images/couple_car_selfie_1785564461927.jpeg';
import theaterImg from '../assets/images/couple_theater_date_1785564475868.jpeg';
import shoulderImg from '../assets/images/couple_head_shoulder_1785564489080.jpeg';
import cafeImg from '../assets/images/couple_cafe_date_1785564503259.jpeg';
import holdingHandsImg from '../assets/images/couple_holding_hands_1785564517755.jpeg';

export const defaultCustomization: AppCustomization = {
  herName: "Bidisha (My Jan Jiu)",
  senderName: "Hritik",
  specialDate: "August 1st",
  enableAudioSynthesizer: true,
  letterText: `My Dearest Bidisha (My Jan Jiu ❤️),

They say distance makes the heart grow fonder, but truth be told, my heart was completely yours from the very moment I met you. You are my soul, my happiness, my everything — my jan jiu.

Even though there are miles and endless roads separating us right now, not a single second goes by where Hritik doesn't feel your warmth beside him. When I look up at the moon tonight, I take comfort knowing we are standing under the exact same sky, breathing the exact same air, and dreaming of the day we never have to say goodbye again.

Thank you for every late-night call, every sweet laugh that brightens my entire world, and for loving me so deeply. Bidisha, you are the most precious gift in my life. Distance is temporary, but Hritik and Bidisha's love is forever.

Happy Girlfriend Day, my jan jiu! Until I can wrap my arms around you and hold you tight, know that my heart beats only for you.

Forever and always yours,
Hritik ❤️`,
  giftBoxMessage: "Distance can separate our hands, but never our hearts! Here are special love coupons crafted with all my love from Hritik for Bidisha ✨",
  giftCoupons: [
    {
      id: 'coupon-1',
      title: 'Late Night FaceTime Date',
      description: 'Order your favorite meal on me, light a candle, and let’s have dinner together over video call!',
      icon: '📱',
      tag: 'Virtual Date'
    },
    {
      id: 'coupon-2',
      title: 'Hritik & Bidisha Long Hug',
      description: 'Redeemable the exact moment we meet again for a 10-minute tight squeeze without letting go.',
      icon: '✈️',
      tag: 'Reunion'
    },
    {
      id: 'coupon-3',
      title: 'Surprise Care Package',
      description: 'Pick anything you want right now, and a sweet surprise box from Hritik will be delivered to Bidisha!',
      icon: '📦',
      tag: 'Surprise'
    },
    {
      id: 'coupon-4',
      title: 'Emergency "I Miss My Jan Jiu" Call',
      description: 'Redeemable 24/7 for an instant call or voice note from Hritik, no matter how busy or late it is.',
      icon: '❤️',
      tag: 'Priority'
    }
  ],
  photos: [
    {
      id: 'photo-1',
      url: carSelfieImg,
      title: 'Late Night Drives Together',
      date: 'Hritik & Bidisha',
      caption: 'Cruising through the night with your smile illuminating the entire road. Every moment with my jan jiu Bidisha is magic.',
      location: 'Late Night Drive'
    },
    {
      id: 'photo-2',
      url: theaterImg,
      title: 'Movie Night Dates',
      date: 'Hritik & Bidisha',
      caption: 'Sitting side by side in the dark movie hall, making funny faces and whispering jokes. I love your laughter so much.',
      location: 'Cinema Date'
    },
    {
      id: 'photo-3',
      url: shoulderImg,
      title: 'Safe in Your Arms',
      date: 'My Jan Jiu',
      caption: 'Bidisha resting peacefully on Hritik\'s shoulder. Feeling completely safe, happy, and at home in each other\'s warmth.',
      location: 'Warm Comfort'
    },
    {
      id: 'photo-4',
      url: cafeImg,
      title: 'Coffee & Endless Conversations',
      date: 'Hritik & Bidisha',
      caption: 'Sharing coffee and endless laughs. The simplest days with you turn into my lifetime favorite memories.',
      location: 'Our Favorite Spot'
    },
    {
      id: 'photo-5',
      url: holdingHandsImg,
      title: 'Walking Hand in Hand',
      date: 'Forever Together',
      caption: 'Holding Bidisha\'s hand tight while walking through the world. Hritik loves Bidisha forever and always.',
      location: 'Hand in Hand'
    }
  ],
  quotes: [
    {
      id: 'q1',
      quote: "Hritik & Bidisha — Distance means so little when someone means your whole world.",
      author: "Hritik & Bidisha"
    },
    {
      id: 'q2',
      quote: "Bidisha is my Jan Jiu. Close together or far apart, you are forever in my heart.",
      author: "Hritik"
    },
    {
      id: 'q3',
      quote: "True love doesn't mean being inseparable; it means being separated and nothing changes.",
      author: "Hritik & Bidisha"
    },
    {
      id: 'q4',
      quote: "Ocean separates lands, not souls. Hritik is with Bidisha always.",
      author: "Forever Yours"
    },
    {
      id: 'q5',
      quote: "Bidisha, you are my jan jiu and my happiest place in this world.",
      author: "Hritik ❤️"
    }
  ]
};

