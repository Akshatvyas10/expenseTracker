import { createSlice } from "@reduxjs/toolkit";

const initialState = {mode:'light'}

export const  Themes = createSlice({
    name: 'light',
    initialState,
    reducers: {
        toggleMode:(state, action)=>{
            const mode :string = action.payload
            state.mode = mode ;
            console.log(state.mode)
        }
    }
})

export const {toggleMode}= Themes.actions;

export default Themes.reducer