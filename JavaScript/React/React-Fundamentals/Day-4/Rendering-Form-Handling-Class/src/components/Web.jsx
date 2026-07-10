import React from 'react'
import Card from './Card'
import Contact from './Contact'
import About from './About'

const Web = () => {
  return (
    <div className='h-screen grid grid-cols-4'>
        <h1>Web</h1>
        <Card/>
        <Contact/>
        <About/>
    </div>
  )
}

export default Web
