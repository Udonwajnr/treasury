import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <header className='bg-[#fcb900] '>
        <nav className='flex justify-between items-center p-3 text-[#0c51b5] '>
            <div className="logo ">
                <Link className='text-2xl md:text-sm font-bold' to={'/'}>UMOH'S TREASURY DAPP</Link>
            </div>
            <div className="nav-item-list">
                <ul className='flex gap-x-3 text-lg md:text-sm'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to={'/treasury'}>Treasury</Link>
                    </li>
                </ul>
            </div>
        </nav>
   </header>
  )
}

export default Navbar