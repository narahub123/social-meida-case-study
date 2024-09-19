import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.types";

interface UserState {
  currentUser: UserType | undefined;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: undefined,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
