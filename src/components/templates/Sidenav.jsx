import axios from '../../utils/axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/Logo.png'

export const Sidenav = ({ menuset }) => {

  return (
    <div className={`sidenav duration-300 w-[20%] sm:overflow-y-auto sm:z-[100] sm:w-[50%] sm:absolute ${menuset ? "sm:left-0" : "sm:left-[-100%]"} h-[100vh] overflow-y-auto bg-gray-700 p-5`}>
      <h1 className='font-bold mt-5 items-center'>
        <img width={140} className='rounded-full mr-3' src={logo} alt="Logo" />
      </h1>
      <nav className='flex flex-col text-xl gap-2'>
        <h1 className='mt-10 mb-5 font-semibold text-xl'>New Feeds</h1>
        <Link to="/trending" className='hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 rounded-xl'>
          <i className="mr-2 text-[#A2C579] ri-fire-fill"></i>
          Trending
        </Link>
        <Link to="/popular" className='hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 rounded-xl'>
          <i className="mr-2 text-[#A2C579] ri-bard-fill"></i>
          Popular
        </Link>
        <Link to="/movie" className='hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 rounded-xl'>
          <i className="mr-2 text-[#A2C579] ri-movie-2-fill"></i>
          Movies
        </Link>
        <Link to="/tv" className='hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 rounded-xl'>
          <i className="mr-2 text-[#A2C579] ri-slideshow-3-fill"></i>
          TV Shows
        </Link>
        <Link to="/person" className='hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 rounded-xl'>
          <i className="mr-2 text-[#A2C579] ri-team-fill"></i>
          People
        </Link>
        <Link to="/MovieProvider" className='hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 flex items-center rounded-xl'>
          <i className="mr-2 text-[#A2C579] ri-clapperboard-fill"></i>
          Movies/<br /> TV Shows Providers
        </Link>
        {/* Login Section */}
        <Link to="/login" className='mt-10 hover:bg-[#383835] text-[1.3vw] sm:text-[4vw] p-5 rounded-xl flex items-center'>
          <i className="mr-2 text-[#A2C579] ri-login-circle-fill"></i>
          Login
        </Link>
      </nav>
      <div className="flex gap-3 text-sm mt-auto">
        <h1>MADE BY SACHIN KUMAR</h1>
        <a
          target="_blank"
          href=""
        >
          <i className="ri-instagram-fill"></i>
        </a>
      </div>
    </div>
  )
}
