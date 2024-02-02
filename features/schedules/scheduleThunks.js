import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/api'

export const addSchedule = createAsyncThunk(
  'schedules/addSchedule',
  async (arg, thunkAPI) => {},
)

export const deleteSchedule = createAsyncThunk(
  'schedules/deleteSchedule',
  async (arg, thunkAPI) => {
    return await api.schedule
      .deleteSchedule({ scheduleId: arg.scheduleId })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)

export const addCourseToSchedule = createAsyncThunk(
  'schedules/addCourseToSchedule',
  async (arg, thunkAPI) => {
    return await api.schedule
      .addCourseToSchedule({
        scheduleId: arg.scheduleId,
        data: { course: { id: arg.course.id } },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)

export const deleteCourseFromSchedule = createAsyncThunk(
  'schedules/deleteCourseFromSchedule',
  async (arg, thunkAPI) => {
    return await api.schedule
      .deleteCourseFromSchedule({
        scheduleId: arg.scheduleId,
        data: { course: { id: arg.course.id } },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)
