import {useDispatch} from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react';
import {login,logout} from './store/authSlice'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import authService from './appwrite/auth'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading?(
    <div className='min-h-screen w-screen flex justify-center items-center bg-gray-700'>
      <div className='block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):(
    <div className='h-screen w-screen flex items-center justify-center'>Loading.....</div>
  )
}

export default App
