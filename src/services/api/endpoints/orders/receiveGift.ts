import { IGift, IUser } from '@/types';

type ReceiveGiftResponse = {
  status: number;
  data: {
    _id: string;
    userId: IUser;
    giftId: IGift;
    hash: string;
    status: 'sent';
    purchaseDate: string;
    paymentId: string;
    sendDate: string;
    recipientId: IUser;
  };
};

const receiveGift = {
  query: ({ id, hash }: { id: string; hash: string }) => ({
    url: '/order/receiveGift',
    method: 'POST',
    body: {
      id,
      hash,
    },
  }),
};

export { receiveGift, type ReceiveGiftResponse };
