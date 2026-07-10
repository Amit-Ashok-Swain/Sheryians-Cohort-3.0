import React, { useState } from 'react'


const App = () => {
    console.log("Rendering...");
    
      const [count, setCount] = useState(0);
      const [user, setUser] = useState({name:"Amit"});
      const [hobby, setHobby] = useState({hobby:"Reading"})
  return (
    <div>
      <div>
        <h1>Count - {count}</h1>
        <h1>Name  - {user.name}</h1>
        <h1>Hobby - {hobby.hobby}</h1>
      </div>
      <div>
      <button onClick={()=>{setCount(count+1)}}>Increment</button>
      <button onClick={()=>{
        user.name="Ram";
        setUser(user);
        }}>Change Name</button>
      <button onClick={()=>{
        setHobby({hobby:"Coding"})
      }}>Change Hobby</button>
      </div>
    </div>
  )
}

export default App
