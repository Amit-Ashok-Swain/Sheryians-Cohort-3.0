import React, { useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserCard from "./components/UserCard.jsx";
const App = () => {
  const [toggle, setToggle] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const deleteUser = (idx) =>{
    let users = usersData.filter((user,index)=>index!==idx);
    setUsersData(users);
  }
  console.log(usersData);
  return (
    <div className=" bg-gray-300 min-h-screen flex flex-col justify-center items-center py-10 gap-6">
      {/* {toggle ? <Register setToggle = {setToggle} setUsersData = {setUsersData}/>:
      <Login setToggle={setToggle}/>
      } */}
      {toggle ? (
        usersData.map((elem,index) => (
          <UserCard key = {index} setToggle={setToggle} userData={elem} del={deleteUser} idx = {index}/>
        ))
      ) : (
        <Register setToggle={setToggle} setUsersData={setUsersData} />
      )}
    </div>
  );
};

export default App;
