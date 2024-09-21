import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    companies: [],
    email: null
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
  },
})

export const { setCompanies, setEmail } = userAuthSlice.actions

export const selectCompanies = (state: RootState) => state.userAuth.companies
export const selectEmail = (state: RootState) => state.userAuth.email

export default userAuthSlice.reducer