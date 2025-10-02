import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import {Button,Logo} from './index'
import Input from "./Input";
import authService from "../appwrite/auth";
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
export default function Login(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");

    const login=async(data)=>{
        setError("")
        try {
           const session= await authService.login(data);
           if(session){
            const userData=await authService.getCurrentUser();
            if(userData){ 
            dispatch(authLogin({userData}))
            navigate("/")
            }
           }
        } catch (error) {
            setError(error.message)
        }
    }
    return(
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100px"/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don't have an account
                <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">
            {error} </p>}
            {/* handlesubmit aik method ha jahan per ap apna method detay ho kay me is tarah say form ko handle karon ga
            form jab submit ho ga to handle submit aik event ha wo call hota ha ab or input fields me hamay state handle ki 
            zarorat nahi hoti qn kay waha hum register ko use kartay han jis ki waja jub form submit hota ha to handlesubmit 
            call ho ga wo automatically values lay le ga register kay through */}

            {/* must spread the regiter otherwise value will be overwrite beacause of register used in another input field and the 
            name of register must be unique and another is object in register that have many options*/}
            <form onSubmit={handleSubmit(login)} className="mt-8">
                <div className="space-y-5">
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate:{
                            matchPattern: (value)=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter valid email address"
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required:true,
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

