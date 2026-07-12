import React from 'react'
import Card from './components/Card'
import Contact from './components/Contact'
import About from './components/About'

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
