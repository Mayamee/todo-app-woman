import { createSlice } from '@reduxjs/toolkit'
import { IAuthModel } from '../../models/IAuthModel'
import { loginUser, logoutUser, refreshToken, registerUser } from './ActionCreators/AuthCreators'

interface IAuthState {
  authInfo: IAuthModel
  isLoading: boolean
  error: string | null
}

const initialState: IAuthState = {
  authInfo: {
    isAuthenticated: false,
    login: null,
    id: null,
    accessToken: null,
    refreshToken: null,
  },
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {})
      .addCase(loginUser.rejected, (state, action) => {})
    builder
      .addCase(registerUser.pending, (state) => {})
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(registerUser.rejected, (state, action) => {})
    builder
      .addCase(logoutUser.pending, (state) => {})
      .addCase(logoutUser.fulfilled, (state, action) => {})
      .addCase(logoutUser.rejected, (state, action) => {})
    builder
      .addCase(refreshToken.pending, (state) => {})
      .addCase(refreshToken.fulfilled, (state, action) => {})
      .addCase(refreshToken.rejected, (state, action) => {})
  },
})
