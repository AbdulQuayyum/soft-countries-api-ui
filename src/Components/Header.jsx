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
            <div className='items-center hidden gap-2 navbar-sub-container lg:flex gap-x-12'>
                <Link to="/Pricing" className=''>
                    Pricing
                </Link>
                <Link to="/Documentation" className=''>
                    Documentation
                </Link>
                <span className='py-4 border-r-[1px] border-black'></span>
                <Link to="/FAQ" className=''>
                    FAQ
                </Link>
                <Link to="/Feedback" className=''>
                    Feedback
                </Link>
            </div>
            <button className='items-center px-6 py-3 text-white bg-black rounded-lg'>
                Get Started
            </button>
        </nav>
    )
}

export default Header