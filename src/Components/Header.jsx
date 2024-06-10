import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

import assets from "../Assets/Index"
import { Sidebar, AuthModal } from "./Index"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fields, setFields] = useState({ email: "", password: "" })
    const [showModal, setShowModal] = useState(false);

    const HandleShowModal = async () => {

    }

    const HandleLogout = async () => {

    }

    const HandleOpen = async () => {

    }

    return (
        <nav className='navbar-container'>
            <Link to="/" className='flex items-center logo gap-x-4'>
                <img src={assets.logo} alt='Logo' className='object-contain w-auto h-10' />
            </Link>
            <div className='navbar-sub-container items-center hidden gap-2 lg:flex gap-x-12'>
                <Link to="/Pricing" className=''>
                    Pricing
                </Link>
                <Link to="/Pricing" className=''>
                    Documentation
                </Link>
                <Link to="/Pricing" className=''>
                    FAQ
                </Link>
                <span className='py-4 border-r-[1px] border-black'></span>
                <button className='text-black bg-transparent border-black border rounded-lg px-6 py-2 items-center'>
                    Sign In
                </button>
            </div>
            <button className='text-white bg-black rounded-lg px-6 py-3 items-center'>
                Get Started
            </button>
        </nav>
    )
}

export default Header