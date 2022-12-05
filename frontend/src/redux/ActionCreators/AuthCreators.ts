import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthData } from '../../models/IAuthData'
import AuthService from '../../services/AuthService'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (authData: IAuthData, thunkApi) => {
    try {
      const { data } = await AuthService.login(authData)
      localStorage.setItem('token', data.accessToken)
      return data
    } catch (error) {
      if (!(error instanceof Error)) return
      return thunkApi.rejectWithValue(error.message)
    }
  }
)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (authData: IAuthData, thunkApi) => {
    try {
      const { data } = await AuthService.register(authData)
      localStorage.setItem('token', data.accessToken)
      return data
    } catch (error) {
      if (!(error instanceof Error)) return
      return thunkApi.rejectWithValue(error.message)
    }
  }
)
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkApi) => {
  try {
    const { data } = await AuthService.logout()
    localStorage.removeItem('token')
    return data
  } catch (error) {
    if (!(error instanceof Error)) return
    return thunkApi.rejectWithValue(error.message)
  }
})
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkApi) => {
  try {
    const { data } = await AuthService.refreshToken()
    localStorage.setItem('token', data.accessToken)
    return data
  } catch (error) {
    if (!(error instanceof Error)) return
    return thunkApi.rejectWithValue(error.message)
  }
})
