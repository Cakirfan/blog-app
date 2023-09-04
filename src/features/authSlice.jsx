import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    currentUserId: null,
    loading: false, // const [loading,setLoading] = useState(false)
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
    profileSuccess: (state, { payload }) => {
      state.image = payload?.user?.image;
      state.first_name = payload?.user?.first_name;
      state.email = payload?.user?.email;
      state.bio = payload?.user?.bio;
    },
    // prop drilling
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.username;
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
  registerSuccess,
  fetchFail,
  profileSuccess,
} = authSlice.actions;
export default authSlice.reducer;

// async-thunk yerine manuel dispatclerle yapıyoruz. extra reducerlarla yapmadan da bu şekilde yapabiliyoruz. İki yönteminde avantajı ve dezavantajı var.
