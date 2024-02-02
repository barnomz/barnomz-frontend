import { createSlice } from '@reduxjs/toolkit'

export const scheduleSlice = createSlice({
  name: 'schedules',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('schedules/addSchedule/fulfilled', (state, action) => {})
      .addCase('schedules/deleteSchedule/fulfilled', (state, action) => {})
      .addCase('schedules/addCourseToSchedule/fulfilled', (state, action) => {})
      .addCase(
        'schedules/deleteCourseFromSchedule/fulfilled',
        (state, action) => {},
      )
  },
})

export const {
  addSchedule,
  deleteSchedule,
  addCourseToSchedule,
  deleteCourseFromSchedule,
} = scheduleSlice.actions
export default scheduleSlice.reducer
