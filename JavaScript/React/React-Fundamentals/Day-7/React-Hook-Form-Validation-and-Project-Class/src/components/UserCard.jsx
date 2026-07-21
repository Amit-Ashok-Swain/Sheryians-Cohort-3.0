import React from 'react'

const UserCard = ({user, deleteUser, id, setUpdatedData, setToggle}) => {

  return (
    <div className='p-4 border border-white rounded flex flex-col gap-5 bg-gray-800'>
      <div className='h-45 w-fir flex items-center-safe justify-center'>
        <img className='h-45 object-fit rounded' src={user.imageUrl} alt="" />
      </div>
      <div>
        <h1 className='font-bold'>{user.name}</h1>
        <p className='font-semibold'>{user.email}</p>
        <p className='font-semibold'>{user.mobileNumber}</p>
      </div>
      <div className='flex align-center justify-evenly'>
        <button onClick = {()=>{
          setUpdatedData(user);
          setToggle((prev)=>!prev);
        }} className='pt-1 pr-2 pl-2 pb-1 bg-yellow-800 rounded cursor-pointer'>Edit</button>
        <button onClick={()=>deleteUser(id)} className='pt-1 pr-2 pl-2 pb-1 bg-red-800 rounded cursor-pointer'>Delete</button>
      </div>
    </div>
  )
}

export default UserCard
