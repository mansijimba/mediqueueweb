import React from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { Outlet } from 'react-router-dom'

export default function 
MainLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
