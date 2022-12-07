import React from 'react'
import { useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminMain from '../components/Admin/AdminMain'
import Checkout from '../components/Checkout'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Myorder from '../components/Myorder'
import Restaurants from '../components/Restaurants'

function Home() {
  const nav = useNavigate()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
   if(user){
    if(user.isAdmin){
      nav("/admin")
    }
   }else{
    nav("/login")
   }
  },[])
  return (
    <Container className='home'>
        <Header/>
        <Routes>
          <Route path='/' element={<Restaurants/>} exact/>
          <Route path='/myorder/:id' element={<Myorder/>} exact/>
          <Route path='/checkout' element={<Checkout/>} exact/>
          <Route path='/admin/*' element={<AdminMain/>}/>
        </Routes>
        <Footer/>
    </Container>
  )
}

export default Home