import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {Link, useNavigate} from 'react-router-dom'

function AccountBtn() {
    
  const navigate = useNavigate()

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={()=> navigate('/account')}
    >Account</button>
  )
}

export default AccountBtn