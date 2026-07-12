import React, { useState } from 'react'

const Counter = () => {

  console.log("Counter is rendering");
    
      let[count,setCount] = useState(0)
        return (
            <div className='bg-amber-500 flex flex-col gap-4.5 justify-between items-center p-2'>
                  <h1 className='text-4xl text-mauve-950'>
                          Counter App</h1>
                                <h2 className='text-2xl text-mauve-950'>
                                        Count - {count}</h2>
                                              <button className='text-mauve-950 border-2 w-fit cursor-pointer p-0.5'
                                                    onClick={()=>{
                                                            // Batching Happens here for similar setCount Function
                                                                    // setCount(count+1);
                                                                            // setCount(count+1);
                                                                                    // setCount(count+1);

                                                                                            // This acts over here as count = count + 1 where local variable count is getting updated
                                                                                                    // setCount(count++);
                                                                                                            // setCount(count++);
                                                                                                                    // setCount(count++);

                                                                                                                            setCount((prev)=>{return prev+1}); // Used Explicit Function
                                                                                                                                    setCount((prev)=>prev+1); // Used Implicit Function
                                                                                                                                            setCount((prev)=>prev+1);
                                                                                                                                                  }}
                                                                                                                                                        >Increment</button>
                                                                                                                                                            </div>
                                                                                                                                                              )
                                                                                                                                                              }

                                                                                                                                                              export default Counter
                                                                                                                                                              