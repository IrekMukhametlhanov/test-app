import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
     <h3 className='font-bold'>Типо гита</h3>

     <Link to="/" className='mr-100'>Home</Link>
     <Link to="favorites">Избранное</Link>
    </nav>
  )
}

export default Navigation