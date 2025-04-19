import {configureStore} from '@reduxjs/toolkit';
import Themes from '../Reducer/DarkModeSlice'; 
export const store =configureStore({
    reducer:Themes
    
})