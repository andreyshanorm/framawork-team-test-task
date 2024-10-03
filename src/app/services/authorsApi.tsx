import { AuthorsRespone } from "../types";
import { api } from "./api";

export const authorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query<AuthorsRespone[], void>({
      query: () => ({
        url: "/authors",
      }),
    }),
  }),
});

export const { useGetAuthorsQuery, useLazyGetAuthorsQuery } = authorsApi;

export const {
  endpoints: { getAuthors },
} = authorsApi;
