import { fetchBaseQuery, retry, createApi } from "@reduxjs/toolkit/query/react";
// import RootState from "../store";

const baseQuerry = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth
  // }
});

const baseQuerryWithRetry = retry(baseQuerry, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuerryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
