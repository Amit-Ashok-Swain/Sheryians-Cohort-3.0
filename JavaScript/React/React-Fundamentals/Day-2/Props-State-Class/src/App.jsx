import React, { useState } from 'react'
import Contact from './components/Contact'
import chaar, { one, two } from './test'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

const App = () => {
  // two();
  // one();
  // chaar();
  // let count = 0;
  let [count,setCount] = useState(0);
  console.log("rendered...");
  let [flag,setFlag] = useState(true);
  
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", margin:"20px"}}>
      {/* <h1>Hello! I'm App</h1>
      <Contact/>
      {Contact()} */}
      {/* <Navbar/>
      <Hero/>
      <Contact/>
      <Footer/> */}
      <h1>Count is {count}</h1>
      <button onClick={()=>{
        setCount(++count);
        console.log(count);
      }} style={{width:"fit-content",padding:"10px 20px", borderRadius:"20px",border:"1px solid red",backgroundColor:"darkorange", cursor:"pointer"}}>Increment</button>
       <button onClick={()=>{
        setFlag(!flag);
        console.log(flag);
      }} style={{width:"fit-content",padding:"10px 20px", borderRadius:"20px",border:"1px solid red",backgroundColor:"darkorange", cursor:"pointer"}}>Change Boolean</button>
    </div>
  )
}

export default App
