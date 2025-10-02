import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../store/authSlice'
import postReducer from '../store/postSlice'
const store=configureStore({
    reducer:{
        Auth:authReducer,
        Post:postReducer
    }
})

export default store;