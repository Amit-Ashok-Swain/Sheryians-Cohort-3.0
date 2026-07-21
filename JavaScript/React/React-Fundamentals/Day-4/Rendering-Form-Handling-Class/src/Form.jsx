// import React, { useState } from 'react'

// const Form = () => {

//   // const [formData, setFormData] = useState({name:"",email:"",password:"",});
//    const [formData, setFormData] = useState({});  
//    console.log(formData);

//   //  let getInputValue = (e) =>{
//   //   return e.target.value;
//   //  }

//   let handleFormClick = (e)=>{
//     // setFormData({...formData,[e.target.name]:e.target.value});
//     let {name,value} = e.target;
//     setFormData({...formData,[name]:value})
//   }
   
//   return (
//     <div className='flex flex-col gap-5 w-60'>
//       <input type="text" name="name" id="name-input" placeholder="Enter your Name" 
//       // onChange={(e)=>{
//       //   // let inputValue = e.target.value;
//       //   // setFormData(inputValue);
//       //   // console.log(inputValue);
//       //   // setFormData({...formData,name:inputValue});
//       //   // setFormData({...formData,name:getInputValue(e)});
//       // }}
//       onChange={handleFormClick}
//       />
//       <input type="email" name="email" id="email-input" placeholder="Enter your E-mail"
//       // onChange={(e)=>{        
//       //   // let inputValue = e.target.value;
//       //   // setFormData(inputValue);
//       //   // console.log(inputValue);
//       //   // setFormData({...formData,email:inputValue});
//       //   // setFormData({...formData,email:getInputValue(e)});
//       // }}
//       onChange={handleFormClick}
//       />
//       <input type="password" name="password" id="password-input" placeholder="Enter your Password" 
//       // onChange={(e)=>{        
//       //   // let inputValue = e.target.value;
//       //   // setFormData(inputValue);
//       //   // console.log(inputValue);
//       //   // setFormData({...formData,password:inputValue});
//       //   // setFormData({...formData,password:getInputValue(e)});
//       // }}
//       onChange={handleFormClick}
//       />
//       <button type="submit">Submit</button>

//       <div>
//         <h1>This is Name - {formData.name}</h1>
//         <h1>This is Email - {formData.email}</h1>
//         <h1>This is Password - {formData.password}</h1>
//       </div>
//     </div>
//   )
// }

// export default Form

import React, { useState } from 'react'

const Form = () => {

  // const [formData, setFormData] = useState({name:"", email : "", password: ""});
   const [formData, setFormData] = useState({});
  console.log(formData);

  // let getInputValue = (e) => {
  //   return e.target.value;
  // }

  let getFormClickEvent = (e) =>{
    let {name, value} = e.target;
    // return setFormData({...formData, [e.target.name]: e.target.value});
    return setFormData({...formData,[name]:value})
  }
  

  return (
    <div className='h-[260px] flex flex-col gap-5 p-2 border-4 rounded'>
      <input type="text" 
      name='name' 
      placeholder = 'Enter your name: '
      className='border-2 rounded-b-sm p-2'
      // onChange={(e)=>{
      //   // let inputValue = e.target.value;
      //   // console.log(inputValue);
      //   // setFormData(inputValue);
      //   // setFormData({...setFormData,inputValue});
      //   // setFormData({...formData,name: inputValue});
      //   // setFormData({...formData,name: getInputValue(e)});
      // }}
      onChange={getFormClickEvent}
      />
      <input type="email"
      name='email'
      placeholder='Enter your email: '
      className='border-2 rounded-b-sm p-2'
     // onChange={(e)=>{
       // let inputValue = e.target.value;
        // console.log(inputValue);
        // setFormData(inputValue);
        // setFormData({...setFormData,inputValue});
        // setFormData({...formData,email: inputValue});
        // setFormData({...formData,email: getInputValue(e)});
        
      // }}
      onChange={getFormClickEvent}
      />
      <input type="password" 
      name = "password"
      placeholder = 'Enter your password: '
      className='border-2 rounded-b-sm p-2'
      // onChange={(e)=>{
        // let inputValue = e.target.value;
        // console.log(inputValue);
        // setFormData(inputValue);
        // setFormData({...setFormData,inputValue});
        // setFormData({...formData,password: inputValue});
        // setFormData({...formData,password: getInputValue(e)});
      // }}
      onChange={getFormClickEvent}
      />
      <button type="submit"
      className='border-2 bg-amber-700 font-bold w-fit p-2'
      >Submit</button>
    </div>
  )
}

export default Form
