import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "UserData",
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "RoleList",
    "RolePermissions",
    "Dashboard",
  ],
  endpoints: (build) => ({
    authenticateUser: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: build.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logOutUser: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["User"],
    }),
    reAuthenticateUser: build.query({
      query: () => "auth/relogin",
      providesTags: ["UserData"],
    }),
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "/management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getRoleList: build.query({
      query: () => `management/roles`,
      providesTags: ["RoleList"],
    }),
    getRolePermissions: build.query({
      query: (name) => `management/roles/${name}`,
      providesTags: ["RolePermissions"],
    }),
    updateRolePermissions: build.mutation({
      query: (payload) => ({
        url: `management/roles/${payload.role}`,
        method: "POST",
        body: payload.permissions,
      }),
      invalidatesTags: ["RolePermissions"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useAuthenticateUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
  useReAuthenticateUserQuery,
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetRoleListQuery,
  useGetRolePermissionsQuery,
  useUpdateRolePermissionsMutation,
  useGetDashboardQuery,
} = api;
