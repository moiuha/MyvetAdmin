import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import blacklogo from '../Assets/blacklogo.png';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const LoggedInNavbar = () => {
  return (
    <nav className="bg-gray-200 sticky top-0 z-50 shadow-xl">
      <div className="flex justify-between items-center px-4 py-2 mx-20">
        <div className="flex items-center">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src={blacklogo} alt="Logo" width="70px" minWidth="60px" />
          </Link>
          <span className="ml-2 text-xl font-bold">Myvet</span>
        </div>
        {/* Show login button only if showLoginButton prop is true and not on the login page */}
        <div className="flex items-center gap-4">
            <Avatar
                name='Dan Abrahmov' 
                src='https://bit.ly/dan-abramov' />
                <h2 className='text-xl font-semibold'>
                    Admin
                </h2>

        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
