// src/components/Navbar.jsx

import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigation = useNavigate();
    
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">

                {/* Logo/Brand Name */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigation('/')}>
                    <div className="p-1 bg-indigo-100 rounded-full">
                        <img 
                            src="./public/logo.png" 
                            alt="Logo"
                            className="w-12 h-12 object-contain" 
                        />
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-gray-700">Expense <span className='text-indigo-700'>Tracker</span></p>
                </div>

                {/* Navigation/Action Buttons (Right Side) */}
                <div className="flex items-center space-x-3">
                    <button className="flex justify-center items-center bg-indigo-100 w-10 h-10 -rotate-10 hover:-rotate-20 cursor-pointer transition-all duration-200 rounded-full shadow-md">
                        <i className="fa-regular fa-moon text-indigo-700 text-[20px]"></i>
                    </button>
                    <button onClick={() => navigation('/signin')} 
                        className="hidden sm:inline-block py-2 px-4 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 cursor-pointer transition">
                        Login
                    </button>
                    <button onClick={() => navigation('/signup')} 
                        className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 cursor-pointer transition">
                        Register
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Navbar;