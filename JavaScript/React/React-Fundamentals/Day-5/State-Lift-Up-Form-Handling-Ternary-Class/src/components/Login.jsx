import React from 'react'

const Login = ({setToggle}) => {
  return (
    <div className='h-in flex flex-col gap-5 items-center justify-between border-4 rounded p-30 bg-white'>
        <h1 className='font-[700] text-3xl'>Login</h1>
        <form className='flex flex-col gap-3' action="">
            <input type="email"
            placeholder='Your E-mail'
            name="email"
            className='border-2 rounded p-2 bg-blue-50'/>
            <input type="password"
            placeholder='Your Password'
            name="password"
            className='border-2 rounded p-2 bg-blue-50'/>
            <button
            className='bg-blue-800 font-white border-black-2 rounded text-white font-bold h-10 cursor-pointer'>Login</button>
            <p>Don't have an Account? <span className='font-semibold text-blue-700 cursor-pointer' onClick={()=>{setToggle(true)}}> Register here! </span> </p>
      </form>
    </div>
  )
}

export default Login
