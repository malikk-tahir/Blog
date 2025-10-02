import {createSlice} from '@reduxjs/toolkit'
import { login } from './authSlice';
const initialState={
    data:[],
    currPost:null,
}


const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.data.push(action.payload.data);
        },
        updatePost:(state,action)=>{
            const {id,title,content,featuredImage,status}=action.payload
            state.data.forEach((post)=>{
                if(post.$id===id){ 
                post.title=title, 
                post.content=content,
                post.featuredImage=featuredImage,
                post.status=status
                }
            })
        },
        delPost:(state,action)=>{
            state.data=state.data.filter((post)=>(
                post.$id!==action.payload.id
            ))
        },
        loadPosts:(state,action)=>{
            state.data=action.payload.data;
        },
        getCurrent:(state,action)=>{
            state.data.forEach((post)=>{
                if(post.$id===action.payload.id){
                    state.currPost=post
                }
            })
        },
        setCurrrent:(state,action)=>{
            state.currPost=action.payload.post
        },
        emptyAll:(state)=>{
            state.data=[];
            state.currPost=null;
        }
   }
})

export const {loadPosts,addPost,updatePost,delPost,getCurrent,emptyAll,setCurrrent}=postSlice.actions;

export default postSlice.reducer;