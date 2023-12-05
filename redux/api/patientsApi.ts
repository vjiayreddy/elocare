import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "./routers";
import _ from "lodash";

export const patientApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    filterPatients: builder.query<any, { dateOfBirth?: string }>({
      query: ({ dateOfBirth }) => {
        return {
          url: API_ROUTES.FILTER_PATIENTS,
          params: {
            dateOfBirth,
            page: 1,
            limit: 100,
          },
        };
      },
      transformResponse: (response: any) => {
        if (response?.data?.length > 0) {
          let users: any[] = [];
          response?.data.map((user: any) => {
            users.push({
              id: user?._id,
              ...user,
            });
          });
          return {
            data: users,
          };
        }
        return {
          data: [],
        };
      },
    }),
  }),
});

export const {
  useFilterPatientsQuery,
  useLazyFilterPatientsQuery,
  usePrefetch,
} = patientApi;
