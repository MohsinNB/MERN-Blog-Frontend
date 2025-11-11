import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeReducer,
  },
});

export default store;
