import React, { useState } from 'react'
import Navbar from './components/Navbar'
import UserCard from './components/UserCard'
import Form from './components/Form';

const App = () => {

  const [toggle,setToggle] = useState(false);

  // const [usersData,setUsersData] = useState(JSON.parse(localStorage.getItem("users")) || []);
   const [usersData,setUsersData] = useState(()=>JSON.parse(localStorage.getItem("users")) || []);

   const [updatedData, setUpdatedData] = useState(null);

   const deleteUser = (id) =>{
      let filteredUsers = usersData.filter((user)=>user.id!==id);
      console.log(filteredUsers);
      setUsersData(filteredUsers);
      localStorage.setItem("users",JSON.stringify(filteredUsers));
   };

  console.log(usersData);
  
  return (
    <div className='p-3 h-screen bg-gray-950 text-white m-auto flex flex-col gap-3'>

      <Navbar setToggle = {setToggle} setUpdatedData = {setUpdatedData}/>

      {toggle?
      <div className='p-2 flex items-center justify-center'>
        <Form usersData = {usersData} setUsersData = {setUsersData} updatedData = {updatedData} setUpdatedData = {setUpdatedData} setToggle = {setToggle}/>
      </div>
      :
      <div className='flex gap-3'>
        { usersData.map((elem)=>{
          return <UserCard key={elem.id} user = {elem} deleteUser = {deleteUser} id={elem.id} setUpdatedData = {setUpdatedData} setToggle = {setToggle}/>
        })
        }
      </div>
      }

    </div>
  )
}

export default App
