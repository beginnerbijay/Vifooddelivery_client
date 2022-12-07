import React from 'react'
import { useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import AddMenu from './AddMenu'
import AllMenus from './AllMenus'
import AllOrders from './AllOrders'
import EditMenu from './EditMenu'

function AdminMain() {
    const nav = useNavigate()
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('user'))
        if(admin){
            if(!admin.isAdmin){
                nav("/")
            }
        }else{
            nav("/login")
        }
    }, [])
    
  return (
    <>
        <Routes>
            <Route path='/allmenus' element={<AllMenus/>} exact/>
            <Route path='/editmenu/:id' element={<EditMenu/>} exact/>
            <Route path='/addmenu' element={<AddMenu/>} exact/>
            <Route path='/' element={<AllOrders/>} exact/>
        </Routes>
    </>
  )
}

export default AdminMain