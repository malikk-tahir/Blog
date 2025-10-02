import { useState,useEffect } from "react"
import services from "../appwrite/blogService"
import {useSelector} from 'react-redux'
import { useParams,useNavigate,Link } from "react-router-dom"
import { Button,Container } from "../components"
import parse from 'html-react-parser'
import {useDispatch} from 'react-redux'
import {delPost,getCurrent,setCurrrent} from '../store/postSlice'

function Post(){

    // const [post,setPost]=useState(null);
    const post=useSelector(state=>state.Post.currPost);
    const posts=useSelector(state=>state.Post.data)
    // console.log("hello");
    
    
    // console.log(post);
    
    const navigate=useNavigate();
    const {url}=useParams();
    // console.log(url);
    
    const dispatch=useDispatch();

    const userData=useSelector(state=>state.Auth.userData);
    // console.log(userData);
    let isEditOrDelete= post && userData ? post.userId===userData.$id:false;
    // console.log(isEditOrDelete);
    

    useEffect(()=>{
        if(url){
            if(posts.length>0){
                dispatch(getCurrent({id:url}))
                // console.log("hello");
            }else{
                services.getPost(url).then((post)=>{
                    if(post){   
                        dispatch(setCurrrent({post}))
                        // console.log("i");
                    }
                    else {navigate("/")}
                })
            }
        }else{
            navigate("/")
        }
    },[url,navigate])


    const deleteBtn=()=>{
        if(post){
            services.deletePost(post.$id).then((deleted)=>{
                if(deleted){
                    services.deleteFile(post.featuredImage);
                    dispatch(delPost({id:post.$id}))
                    navigate("/")
                }
            })
        }
    }
    return post?(
            <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={services.getFilePre(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                    />
                    {isEditOrDelete && 
                    <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deleteBtn}>
                        Delete Post
                    </Button>
                    </div>
                    }
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
            </div>
    ):null
}

export default Post