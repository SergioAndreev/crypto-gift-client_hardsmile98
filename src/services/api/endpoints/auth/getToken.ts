interface GetTokenResponse {
  token: string;
}

const getToken = {
  query: ({ tgData }: { tgData: string }) => ({
    url: '/auth/getToken',
    method: 'POST',
    body: {
      initData: tgData,
    },
  }),
};

export { getToken, type GetTokenResponse };
