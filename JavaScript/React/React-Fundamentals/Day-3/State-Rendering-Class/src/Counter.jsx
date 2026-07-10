import React, { useState } from 'react'

const Counter = () => {

    console.log("Count is rendering....");
    let [count,setCount] = useState(0);

  return (
    <div>
      <h1>Count - {count}</h1>
      <button onClick={()=>{
        setCount((prev)=>prev+1);
        setCount((prev)=>prev+1);
        setCount((prev)=>prev+1);
        }
      }>Increment</button>
    </div>
  )
}

export default Counter
