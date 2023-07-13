import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getTokenFromStorage } from "../middlewares/localStorageMiddleware";

export interface UserState {
  user: {
    id: string;
    username: string;
    globalname: string;
    avatar: string;
  } | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: getTokenFromStorage(),
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Exclude<UserState["user"], null>>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setToken: (state, action: PayloadAction<UserState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setToken } = userSlice.actions;

export default userSlice.reducer;