import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthData } from '../../../models/IAuthData'
import AuthService from '../../../services/AuthService'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (authData: IAuthData, thunkApi) => {
    try {
      const res = await AuthService.login(authData)
      return res.data
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
    } catch (error) {
      if (!(error instanceof Error)) return
      return thunkApi.rejectWithValue(error.message)
    }
  }
)
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkApi) => {
  try {
  } catch (error) {
    if (!(error instanceof Error)) return
    return thunkApi.rejectWithValue(error.message)
  }
})
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkApi) => {
  try {
  } catch (error) {
    if (!(error instanceof Error)) return
    return thunkApi.rejectWithValue(error.message)
  }
})
