import React, { useState } from 'react'
import {Container, Logo, AccountBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Category",
      slug: "/category",
      active: authStatus,
    },
    {
      name: "Language",
      slug: "/lang",
      active: authStatus,
    },
    {
      name: "Language",
      slug: "/Homelang",
      active: !authStatus,
    },
    {
      name: "Category",
      slug: "/Homecategory",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-white mt-0 font-bold text-black text-lg'>
      <Container>
        <nav className='flex justify-between items-center'>
          {/* Logo Section */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className='md:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-black focus:outline-none'
            >
              {/* Hamburger Icon */}
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className={`flex-col md:flex-row md:flex ml-auto items-center space-y-4 md:space-y-0 md:space-x-6 ${menuOpen ? 'block' : 'hidden'} md:block`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false); // Close menu on navigation
                    }}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <AccountBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
    // <header className='py-3 shadow bg-white mt-0 font-bold text-black text-lg'>
    //   <Container>
    //     <nav className='flex'>
    //       <div className='mr-4'>
    //         <Link to='/'>
    //           <Logo width='70px'   />
    //           </Link>
    //       </div>
    //       <ul className='flex ml-auto'>
    //         {navItems.map((item) => 
    //         item.active ? (
    //           <li key={item.name}>
    //             <button
    //             onClick={() => navigate(item.slug)}
    //             className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    //             >{item.name}</button>
    //           </li>
    //         ) : null
    //         )}
    //         {authStatus && (
    //           <li>
    //             <AccountBtn />
    //           </li>
    //         )}
    //       </ul>
    //     </nav>
    //     </Container>
    // </header>
  )
}

export default Header