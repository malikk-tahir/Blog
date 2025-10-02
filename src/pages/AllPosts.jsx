import { useState,useEffect } from "react"
import { PostCard,Container } from "../components"
import services from "../appwrite/blogService";
import {useDispatch,useSelector} from 'react-redux'
import {loadPosts} from '../store/postSlice'
function AllPosts(){
    // const [posts,setPosts]=useState([]);

    const dispatch=useDispatch();
    const posts=useSelector(state=>state.Post.data)
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
                <div className="flex felx-wrap">
                    {posts.map((post)=>(
                        post.status==="active" && (
                        <div key={post.$id} className="p-2 w-1/4">
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
                                No post yet
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default AllPosts