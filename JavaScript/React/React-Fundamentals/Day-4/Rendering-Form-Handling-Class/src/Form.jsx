import React from 'react'

const Form = () => {
  return (
    <div>
      <input type="text" name="name" id="name-input" placeholder="Enter your Name" />
      <input type="email" name="email" id="email-input" placeholder="Enter your E-mail" />
      <input type="password" name="password" id="password-input" placeholder="Enter your Password" />
      <button type="submit">Submit</button>
    </div>
  )
}

export default Form
