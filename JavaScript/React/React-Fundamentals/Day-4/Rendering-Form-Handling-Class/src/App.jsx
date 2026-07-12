import React, { useState } from 'react'

const App = () => {
    // Every time state changes properly, this will print.
    // Jab bhi state sahi se update hogi, ye print hoga aur component re-render hoga.
    console.log("Rendering...");
    
    // State Initializations
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
      
      {/* 
        Works perfectly. Primitive values (numbers) are replaced. React sees 1 !== 0 and re-renders.
        Ye sahi chalega. Primitive value change ho rahi hai, toh React naya value dekh kar UI re-render karega. 
      */}
      <button onClick={()=>{ setCount(count+1) }}>
        Increment
      </button>

      {/* 
        BUG! We mutate the object directly. 'user' still points to the same memory address. 
        React compares the old and new reference, sees they are the same, and BAILS OUT (no re-render).
        
        GADBAD (Bug)! Humne same object ko direct modify kar diya. React memory reference 
        check karta hai, aur kyunki reference same hai, usko lagta hai kuch change nahi hua aur wo UI update nahi karega.
        
        FIX / SAHI TARIQA: setUser({ ...user, name: "Ram" }) 
      */}
      <button onClick={()=>{
        user.name="Ram";
        setUser(user);
      }}>
        Change Name
      </button>

      {/* 
        Works perfectly. We are passing a brand new object {hobby: "Coding"}. 
        The memory reference changes, so React triggers a re-render.
        (Note: When this re-renders, the 'Name' from above will also suddenly update on the screen!)
        
        Ye ekdum sahi hai. Hum ek bilkul naya object bana kar pass kar rahe hain. 
        Memory reference change ho gaya, toh React re-render karega. 
        (Dhyan dein: Jab ye chalega, toh upar wala 'Name' jo update nahi hua tha, wo bhi screen par update ho jayega kyunki component dubara load hua hai!)
      */}
      <button onClick={()=>{
        setHobby({hobby:"Coding"})
      }}>
        Change Hobby
      </button>
      
      </div>
    </div>
  )
}

export default App