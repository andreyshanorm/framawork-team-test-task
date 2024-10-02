import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
