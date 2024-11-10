import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tagTypes from './tagTypes';
import * as endpoints from './endpoints';
import { envs } from '@/constants';
import { RootState } from '@/store';

export const isErrorWithMessage = (error: unknown): error is { data: { message: string } } =>
  typeof error === 'object' && error !== null && typeof (error as any)?.data?.message === 'string';

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: envs.apiUrl,
    credentials: 'include',

    prepareHeaders(headers, api) {
      const token = (api.getState() as RootState).user.token;

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getToken: builder.query<endpoints.GetTokenResponse, { tgData: string }>(endpoints.getToken),
    getGifts: builder.query<endpoints.GetGiftsResponse, undefined>(endpoints.getGifts),
    getGift: builder.query<endpoints.GetGiftResponse, { id: string }>(endpoints.getGift),
    getGiftHistory: builder.query<endpoints.GetGiftHistoryResponse, { giftId: string }>(
      endpoints.getGiftHistory,
    ),
    getMyGifts: builder.query<endpoints.GetMyGiftsResponse, undefined>(endpoints.getMyGifts),
    getOrderByPaymentId: builder.query<
      endpoints.GetOrderByPaymentIdResponse,
      { paymentId: string }
    >(endpoints.getOrderByPaymentId),
    getOrderById: builder.query<endpoints.GetOrderByIdResponse, { id: string }>(
      endpoints.getOrderById,
    ),
    getUserHistory: builder.query<endpoints.GetUserHistoryResponse, undefined>(
      endpoints.getUserHistory,
    ),
    getLeaderboard: builder.query<endpoints.GetLeaderboardResponse, undefined>(
      endpoints.getLeaderboard,
    ),
    getProfile: builder.query<endpoints.GetProfileResponse, { id?: string }>(endpoints.getProfile),
    getOrdersReceived: builder.query<endpoints.GetOrdersReceivedResponse, { id: string }>(
      endpoints.getOrdersReceived,
    ),
    buyGift: builder.mutation<endpoints.BuyGiftResponse, { id: string }>(endpoints.buyGift),
    receiveGift: builder.mutation<endpoints.ReceiveGiftResponse, { id: string; hash: string }>(
      endpoints.receiveGift,
    ),
  }),

  tagTypes: Object.values(tagTypes),
});

export const {
  useGetTokenQuery,
  useGetGiftsQuery,
  useGetGiftQuery,
  useGetGiftHistoryQuery,
  useGetMyGiftsQuery,
  useGetOrderByPaymentIdQuery,
  useGetOrderByIdQuery,
  useGetUserHistoryQuery,
  useGetLeaderboardQuery,
  useGetProfileQuery,
  useGetOrdersReceivedQuery,
  useBuyGiftMutation,
  useReceiveGiftMutation,
} = publicApi;

export * from './endpoints';
