import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import LoggedInNavbar from './components/LoggedInNav';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  const [adminImage, setAdminImage] = useState('admin.jpg');

  return (
    <ChakraProvider> {/* Wrap your entire application with ChakraProvider */}
      <Router>
        <div>
            {
                localStorage.getItem("jwt")? <LoggedInNavbar/> : <Navbar/>
            }
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
            localStorage.getItem("jwt")? <AdminDashboard/> : <Login/>
} />
            <Route
              path="/AdminDashboard"
              element={<AdminDashboard /> }
            />
            <Route path="/AdminDashboard" element={
                <>   
                <AdminDashboard />
                </>   
                }
           />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
