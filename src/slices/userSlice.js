import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    
  name: 'loginUser',
  initialState: {
    value: localStorage.getItem("user") ?JSON.parse(localStorage.getItem("user")):null
    // permenant data dore rakhe localstorage. redux er ta temporary data
  },
  reducers: {
    logedUser: (state, action) => {
     state.value = action.payload
    },
  },
})

export const { logedUser } = userSlice.actions

export default userSlice.reducer