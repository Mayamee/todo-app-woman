import { createSlice } from '@reduxjs/toolkit'
import { IAuthModel } from '../../models/IAuthModel'
import { loginUser, logoutUser, refreshToken, registerUser } from '../ActionCreators/AuthCreators'

interface IAuthState {
  authInfo: IAuthModel
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

const initialState: IAuthState = {
  authInfo: {
    login: '',
    id: '',
    accessToken: '',
    refreshToken: '',
  },
  isAuth: false,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (!action.payload) return
        state.authInfo = action.payload
        state.isAuth = true
        state.isLoading = false
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (!action.payload) return
        state.authInfo = action.payload
        state.isAuth = true
        state.isLoading = false
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (!action.payload) return
        state.authInfo = {
          login: '',
          id: '',
          accessToken: '',
          refreshToken: '',
        }
        state.isAuth = false
        state.isLoading = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
    // Refresh
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (!action.payload) return
        state.authInfo = action.payload
        state.isAuth = true
        state.isLoading = false
        state.error = null
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuth = false
        state.authInfo = {
          login: '',
          id: '',
          accessToken: '',
          refreshToken: '',
        }
      })
  },
})
