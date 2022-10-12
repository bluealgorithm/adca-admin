import React from 'react'
import { Link, NavLink,  } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'

import { useStateContext } from '../context/AuthContext'
import { links } from './links'
import logo from '../img/logo.png'

const Sidebar = () => {
    const {activeMenu, setActiveMenu, screenSize} = useStateContext()

    const handleCloseSidebar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false)
        }
    }
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg bg-blue-500 text-white text-md m-2'
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'
  return (
      <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
          {activeMenu && (<>
              <div className="flex justify-between items-center">
                  <Link to='/' onClick={handleCloseSidebar} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
                      <img src={logo} alt="ADCA Logo" />
                       <span>ADCA</span>
                  </Link>
                      <button type='button' onClick={()=>setActiveMenu((prevState)=>!prevState)} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                          <MdOutlineCancel />
                      </button>
              </div>
              <div className="mt-10">
                  {links.map((item) => (
                      <div key={item.title}>
                          {/* <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p> */}
                          {item.links.map((link) => (
                              <NavLink to={`/${link.name}`}
                                  key={link.name}
                                  onClick={handleCloseSidebar}
                                  className={({ isActive }) =>
                                    isActive ? activeLink : normalLink
                                }>
                                  {link.icon}
                                  <span className='capitalize'>{link.name}</span>
                                </NavLink>
                            ))}
                      </div>
                  ))}
              </div>
          </>)}
    </div>
  )
}

export default Sidebar