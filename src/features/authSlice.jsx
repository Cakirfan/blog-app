import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    image: "",
    first_name: "",
    email: "",
    bio: "",
    token: null,
  },
  
  reducers: {
    fetchStart: (state) => {
      state.loading = true; // setLoading(true)
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user?.username;
      state.currentUserId = payload?.user?.id;
      state.token = payload?.key;
    },
    // prop drilling
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user?.username;
      state.token = payload?.token;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  profileSuccess,
  registerSuccess,
  fetchFail,
  
} = authSlice.actions;
export default authSlice.reducer;

// async-thunk yerine manuel dispatclerle yapıyoruz. extra reducerlarla yapmadan da bu şekilde yapabiliyoruz. İki yönteminde avantajı ve dezavantajı var.
