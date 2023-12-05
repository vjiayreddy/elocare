"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { patientApi } from "../api/patientsApi";
import { studiesApi } from "../api/studiesApi";
import { projectFolderAndstudySlice } from "../reducers/projectFolderAndstudySlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [studiesApi.reducerPath]: studiesApi.reducer,
  projectFolderAndstudySlice: projectFolderAndstudySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      patientApi.middleware,
      studiesApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
