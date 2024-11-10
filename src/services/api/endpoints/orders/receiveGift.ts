type ReceiveGiftResponse = {
  status: number;
  data: any;
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
