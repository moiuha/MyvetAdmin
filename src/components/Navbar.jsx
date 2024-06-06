import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import blacklogo from '../Assets/blacklogo.png';

const Navbar = ({ showLoginButton }) => {
  const location = useLocation();

  // Check if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className="bg-gray-200 sticky top-0 z-50 shadow-xl">
      <div className="flex justify-center items-center px-4 py-2">
        <div className="flex items-center">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src={blacklogo} alt="Logo" width="70px" minWidth="60px" />
          </Link>
          <span className="ml-2 text-xl font-bold">Myvet</span>
        </div>
        {/* Show login button only if showLoginButton prop is true and not on the login page */}
        {showLoginButton && !isLoginPage && (
          <div className="flex items-center">
            <Link to="/login" className="text-black">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
