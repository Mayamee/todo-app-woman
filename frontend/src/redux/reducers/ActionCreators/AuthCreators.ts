import { createAsyncThunk } from '@reduxjs/toolkit'
interface ILoginData {
  login: string
  password: string
}
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: ILoginData, thunkApi) => {
    try {
    } catch (error) {}
  }
)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: ILoginData, thunkApi) => {
    try {
    } catch (error) {}
  }
)
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkApi) => {
  try {
  } catch (error) {}
})
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkApi) => {
  try {
  } catch (error) {}
})
