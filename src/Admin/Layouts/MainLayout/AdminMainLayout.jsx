import React from 'react'
import { Sidebar } from '../../Components'
import './AdminMainLayout.scss'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <div className='min-h-[18.75rem] absolute w-full bg-indigo-400'></div>
      <Sidebar />
      
      <Outlet />
    </>
  )
}

export default MainLayout