import React from 'react'

const Navbar = ({setToggle, setUpdatedData}) => {
  return (
    <div className='p-3 flex justify-between bg-orange-700 rounded items-center'>
      <div className='w-10 flex items-center'>
        <img className='rounded-full p-0.2' src="https://img.icons8.com/fluent/1200/group--v4.jpg" alt="" />
      </div>
      <div className='flex gap-7 font-semibold text-lg cursor-pointer'>
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </div>
      <button onClick={()=>{
        setUpdatedData(null);
        setToggle(prev=>!prev);
        }} className='bg-gray-800 p-2 rounded font-semibold cursor-pointer'>Create User</button>
    </div>
  )
}

export default Navbar
