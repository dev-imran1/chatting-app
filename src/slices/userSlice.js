import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    
  name: 'loginUser',
  initialState: {
    value: null,
  },
  reducers: {
    logedUser: (state, action) => {
     state.value = action.payload
    },
  },
})

export const { logedUser } = userSlice.actions

export default userSlice.reducer