// slices/authSlice.ts
import { AdminLoginResponse } from "@/types/apiTypes";
import { AuthResponse, User } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | undefined;
  cart: number;
  wish: number;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token"),
  cart: 0,
  wish: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.token = undefined;
      Cookies.remove("token");
    },
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 30 });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setCart: (state, action: PayloadAction<number>) => {
      state.cart = action.payload;
    },
    setWish: (state, action: PayloadAction<number>) => {
      state.wish = action.payload;
    },
  },
});

export const { clearUser, setUser, updateUser, setCart, setWish } =
  authSlice.actions;
export default authSlice.reducer;
