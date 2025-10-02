import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import services from "../appwrite/blogService"
import { PostForm,Container } from "../components"


function EditPost(){

    const [post,setPost]=useState(null);
    const navigate=useNavigate();
    const {url}=useParams()

    useEffect(()=>{
    if(url){
        services.getPost(url).then((post)=>{
            if(post){
                setPost(post)
            }
        })
    }else{
        navigate("/")
    }
    },[url,navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ):null
}

export default EditPost