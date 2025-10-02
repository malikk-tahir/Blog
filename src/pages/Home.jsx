import { useState,useEffect } from "react"
import services from "../appwrite/blogService"
import { Container, PostCard } from "../components"
import {useDispatch} from 'react-redux'
import {loadPosts} from '../store/postSlice'
import {useSelector} from 'react-redux'

function Home(){
    // const [posts,setPosts]=useState([]);

    
    const dispatch=useDispatch();
    const posts=useSelector(state=>state.Post.data);
    // console.log(posts);
    useEffect(()=>{
        if(posts.length===0){
        services.getPosts([]).then((posts)=>{
            if(posts){
                dispatch(loadPosts({data:posts.documents}))
            }
        })
    }
    },[])

    if(posts.length>0){
        return(
            <div className="w-screen py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post)=>(
                            post.status==="active" && (
                            <div className="p-2 w-1/4" key={post.$id}>
                                <PostCard {...post}/>
                            </div>)
                        ))}
                    </div>
                </Container>
            </div>
        )
    }else{
        return(
            <div className="w-full h-60 py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                You must have to login
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    
}

export default Home