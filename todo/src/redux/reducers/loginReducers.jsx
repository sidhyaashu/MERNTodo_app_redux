import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    user:null 
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUser:(state,action)=>{
            state.user = null
        },

    }
})



export const {
    setUser,
    clearUser
} = loginSlice.actions
export default loginSlice.reducer