import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/api'

export const fetchSchedules = createAsyncThunk(
  'schedules/fetchSchedules',
  async (arg, thunkAPI) => {
    return await api.schedule
      .fetchSchedules()
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)
