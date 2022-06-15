import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  posts: null,
  countries: [],
  goodAnswers: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      console.log(action.payload);
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    getCountries: (state, action) => {
      state.countries = action.payload;
    },
    countGoodAnswers: (state) => {
      state.goodAnswers = ++state.goodAnswers;
    },
    resetCounter: (state) => {
      state.goodAnswers = 0;
    },
  },
});

export const {
  login,
  logout,
  getPosts,
  addPost,
  deletePost,
  getCountries,
  countGoodAnswers,
  resetCounter,
} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const posts = (state) => state.user.posts;
export const countries = (state) => state.user.countries;
export const goodAnswers = (state) => state.user.goodAnswers;

export default userSlice.reducer;
