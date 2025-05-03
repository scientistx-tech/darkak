// slices/authSlice.ts
import { AdminLoginResponse } from "@/types/apiTypes";
import { AuthResponse, User } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | undefined;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token"),
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
  },
});

export const { clearUser, setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
