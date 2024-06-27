import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  loading: boolean;
  error: boolean;
}
let token = localStorage.getItem('trackTimeToken') || ""
const initialState: AuthState = {
  token: token,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_login_loading: (state) => {
      state.loading = true;
      state.error = false;
    },
    auth_login_error: (state) => {
      state.error = true;
      state.loading = false;
    },
    auth_login_success: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { auth_login_loading, auth_login_error, auth_login_success } = authSlice.actions;

export default authSlice.reducer;
