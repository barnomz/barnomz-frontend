import { createSlice } from '@reduxjs/toolkit'
import { fetchSchedules } from '@/features/schedules/scheduleThunks'

export const scheduleSlice = createSlice({
  name: 'schedules',
  initialState: {
    schedules: [],
    isLoading: false,
  },
  reducers: {
    addSchedule: (state, action) => {
      state.schedules.push(action.payload)
    },
    addCourse: (state, action) => {
      const { scheduleId, course } = action.payload
      const schedule = state.schedules.find(
        (schedule) => schedule.id === scheduleId,
      )
      schedule.courses.push(course)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload
        state.isLoading = false
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const selectSchedules = (state) => state.schedules.schedules

export const { addSchedule, addCourse, setSchedules } = scheduleSlice.actions
export default scheduleSlice.reducer
