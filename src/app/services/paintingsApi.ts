import type { PaintsResponse } from '../types';
import { api } from './api';

export const paintingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaints: builder.query<PaintsResponse[], void>({
      query: () => ({
        url: '/paintings',
      }),
    }),
    changePage: builder.query<PaintsResponse[], number>({
      query: (pageNumber) => ({
        url: `/paintings?_limit=6&_page=${pageNumber}`,
      }),
    }),
  }),
});

export const { useGetPaintsQuery, useChangePageQuery, useLazyChangePageQuery } = paintingsApi;

export const {
  endpoints: { getPaints, changePage },
} = paintingsApi;
