import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className='h-96 flex justify-center items-center flex-col'>
        <article className='text-blue text-center'>
            <h1 className='text-5xl'>Welcome to Umoh's Treasury.</h1>
            <p className='mt-3'>One of the best Decentralized Application to store your funds.</p>
            <br />
            <Link to={'/treasury'} className="hover:underline duration-150 hover:duration-150">Click here to getStarted</Link>
        </article>

    </div>
  )
}

export default HeroSection