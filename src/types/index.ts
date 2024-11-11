export interface IGift {
  _id: string;
  name: string;
  description: string;
  bgColor: string;
  price: number;
  currency: string;
  slug: string;
  maxAvailable: number;
  available: number;
}

export interface IUser {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  isPremium: boolean;
  languageCode: string;
  telegramId: number;
  username: string;
  giftsReceived: number;
  giftsSent: number;
}
