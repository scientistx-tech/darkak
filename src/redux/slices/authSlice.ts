// slices/authSlice.ts
import { Admin, AdminLoginResponse } from "@/types/apiTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: Admin | null;
  token: string | undefined;
  isAdmin: boolean;
  isModerator: boolean;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token"),
  isAdmin: false,
  isModerator: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.token = undefined;
      state.isAdmin = false;
      state.isModerator = false;
      Cookies.remove("token");
    },
    setUser: (state, action: PayloadAction<AdminLoginResponse>) => {
      state.user = action.payload.admin;
      state.token = action.payload.token;
      state.isAdmin = action.payload.admin.isAdmin;
      state.isModerator = action.payload.admin.isModerator;
      Cookies.set("token", action.payload.token, { expires: 30 });
    },
    updateUser: (state, action: PayloadAction<Admin>) => {
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin;
      state.isModerator = action.payload.isModerator;
    },
  },
});

export const { clearUser, setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
