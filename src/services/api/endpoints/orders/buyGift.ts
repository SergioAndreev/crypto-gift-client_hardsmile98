type BuyGiftResponse = {
  status: number;
  data: {
    id: number;
    status: string;
    hash: string;
    currencyType: string;
    currency: string;
    amount: string;
    botPayUrl: string;
    miniAppPayUrl: string;
    webAppPayUrl: string;
    isAllowComments: boolean;
    isAllowAnonymous: boolean;
    createdAt: Date;
    hiddenMessage?: string;
    isPaidAnonymously?: boolean;
    paidAt?: Date;
    expirationDate?: Date;
    description?: string;
    payload?: any;
  };
};

const buyGift = {
  query: ({ id }: { id: string }) => ({
    url: '/order/buyGift',
    method: 'POST',
    body: {
      id,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { buyGift, type BuyGiftResponse };
