import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { HomePage } from '../pages/Homepage'
import MainLayout from '../layout/MainLayout'
import AuthContextProvider from '../auth/authProvider'
import Dashboard from '../pages/Dashboard'

export default function AppRouter() {
  return (
    <AuthContextProvider>

    <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path = "/" element = {<HomePage/>}></Route>
        <Route path = "/login" element= {<Login/>}></Route>
        <Route path = "/register" element= {<Register/>}></Route>
        <Route path = "/dashboard" element= {<Dashboard/>}></Route>
        </Route> 
    </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  )
}
