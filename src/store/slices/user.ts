import { getLS, setLS } from '@/helpers';
import { createSlice } from '@reduxjs/toolkit';

const THEME_LS_KEY = 'theme';

const themeLsValue = getLS(THEME_LS_KEY);

const initialState = {
  token: null,
  theme: themeLsValue ? themeLsValue : window.Telegram.WebApp.colorScheme,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;

      setLS(THEME_LS_KEY, action.payload);
    },
  },
});

export default userSlice.reducer;

export const { setToken, setTheme } = userSlice.actions;
