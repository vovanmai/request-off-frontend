import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: {

    }
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = {...state.theme, ...action.payload}
    },
  },
})

export const { setTheme } = appSlice.actions

export const getTheme = (state: RootState) => state.app.theme

export default appSlice.reducer