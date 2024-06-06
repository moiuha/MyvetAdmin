import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash, At } from "phosphor-react";
import { useToast } from "@chakra-ui/react";
import facebook from "../Assets/facebook.png";
import google from "../Assets/google.png";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.admin));
      console.log('Login successful!');
      navigate('/AdminDashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.log('Error occurred during login.');
      console.error(error);
      toast({
        title: 'Login failed.',
        description: 'Please check your email and password.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="font-main h-auto flex pb-12 sm:pt-4 pt-16 bg-secondary">
      <div className="w-full sm:w-10/12 mx-0 sm:mx-auto flex justify-center">
        <div className="mt-24 w-96 sm:w-[561px] px-0 sm:p-5 mx-4 border border-black shadow-2xl rounded-3xl bg-transparent backdrop-blur-[20px] box-shadow-custom-light h-[auto] overflow-hidden">
          <form
            className="flex justify-center align-middle"
            onSubmit={handleSubmit}
          >
            <div className="w-[90%] sm:w-[auto]">
              <h1 className="text-3xl sm:text-4xl md:text-4xl mb-10 pt-8 font-bold drop-shadow-xl text-center text-black">
                Login
              </h1>
              <div className="relative mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded-2xl py-3 pr-10 pl-4 outline-none"
                  placeholder="Email"
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center justify-center">
                  <At size={25} />
                </div>
              </div>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded-2xl py-3 px-3 outline-none"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center justify-center"
                >
                  {showPassword ? <EyeSlash size={25} /> : <Eye size={25} />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full my-3 text-white py-3 px-4 rounded-xl bg-gray-600 hover:bg-gray-700"
              >
                Login
              </button>
              <div className="relative my-5 flex items-center justify-center">
                <div className="flex-grow border-t border-black"></div>
                <div className="px-2 text-center font-bold">OR</div>
                <div className="flex-grow border-t border-black"></div>
              </div>
              <div className="px-2 mb-4 text-center font-bold">
                Login with :{" "}
              </div>
              <div className="flex h-12 w-24 mx-auto">
                <div className="w-1/2 flex align-middle justify-center">
                  <a href="#">
                    <img src={facebook} alt="Facebook login" className="w-10" />
                  </a>
                </div>
                <div className="w-1/2 flex align-middle justify-center">
                  <a href="#">
                    <img src={google} alt="Gmail login" className="w-10" />
                  </a>
                </div>
              </div>
              <div className="my-6 text-center text-sm text-gray-500">
                This is an admin page. Unauthorized access is prohibited.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
