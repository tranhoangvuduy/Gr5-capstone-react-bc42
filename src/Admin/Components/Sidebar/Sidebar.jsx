import React,  { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiLayout, FiUsers } from "react-icons/fi"

const Sidebar = () => {

  const activeLink = 'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 bg-blue-500/13 text-decoration-none font-semibold text-slate-700 transition-colors m-2'
  const normalLink = 'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 text-decoration-none font-semibold text-slate-700 transition-colors hover:bg-light-gray m-2'

  
  return (
    <aside className='fixed inset-y-0 flex-wrap items-center justify-between block w-full 
    p-0 my-4 overflow-y-auto antialiased bg-white border-0 shadow-xl
     ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0 max-w-64'
    >
      <div className='h-19'>
        <Link to='/admin' className='block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700 text-center text-decoration-none'>
          <span className='ml-1 font-semibold text-xl'>Admin page</span>
        </Link>
      </div>
      <hr className='h-px border-top-0 mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent'/>
      <div className='items-center block w-auto max-h-screen overflow-hidden h-sidenav grow basis-full'>
        <ul className='flex flex-col pl-0 mb-0 ml-3'>
          <li className='mt-0.5 w-full'>
            <NavLink to='/admin/movies' className={({ isActive}) => isActive ? activeLink : normalLink}
            >
              <FiLayout className='mr-2 text-lg' />
              <span className='ml-1 font-semibold text-base'>Movies</span>
            </NavLink>
          </li>
          <li className='mt-0.5 w-full'>
            <NavLink to='/admin/users' className={({ isActive}) => isActive ? activeLink : normalLink}
            >
              <FiUsers className='mr-2 text-lg' />
              <span className='ml-1 font-semibold text-base'>Users</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* create a button back to customer page */}
      <div className='h-19'>
        <Link to='/' className='block text-sm whitespace-nowrap 
        text-slate-700 text-center text-decoration-none'
        >
          <span className='ml-1 font-semibold text-xl'>Home Page</span>
        </Link>
      </div>
    </aside>
    
  )
}

export default Sidebar