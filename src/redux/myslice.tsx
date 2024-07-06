import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface sliceType {
  user: {
    username: string;
    login: boolean;
  };
  loading: boolean;
}
const initialState: sliceType = {
  user: {
    username: "",
    login: false,
  },
  loading: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userLogin: (state, { payload }: PayloadAction<string>) => {
      state.user.login = true;
      state.user.username = payload;
      console.log("User logged in");
    },
    userLogout: (state) => {
      state.user.login = false;
      console.log("User logged out");
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { userLogin, userLogout ,startLoading , stopLoading } = userSlice.actions;
export default userSlice.reducer;
