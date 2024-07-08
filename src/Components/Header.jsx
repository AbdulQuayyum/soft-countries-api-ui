import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';

import assets from "../Assets/Index"
import { AuthModal } from "./Index"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false); setToggleMenu(false);
        }
    };

    useEffect(() => {
        if (isOpen || toggleMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleMenu]);

    const HandleShowModal = () => {
        setToggleMenu(false);
        setShowModal((prev) => !prev)
    }

    const HandleLogout = () => { setUser(false) }

    const HandleOpen = () => {
        setIsOpen((prev) => !prev)
        if (!isOpen) {
            setToggleMenu(false);
        }
    }

    const HandleToggleMenu = () => {
        setToggleMenu((prev) => !prev);
        if (!toggleMenu) {
            setIsOpen(false);
        }
    }

    return (
        <>
            <nav className='navbar-container'>
                <Link to="/" className='flex items-center logo gap-x-4'>
                    <img src={assets.logo} alt='Logo' className='object-contain w-auto h-10' />
                </Link>
                <div className='items-center hidden gap-2 md:flex gap-x-12'>
                    <Link to="/Resources" className=''>
                        Resources
                    </Link>
                    <Link to="/Pricing" className=''>
                        Pricing
                    </Link>
                    <span className='py-4 border-r-[1px] border-black'></span>
                    <Link to="/FAQ" className=''>
                        FAQ
                    </Link>
                    <Link to="/ContactUs" className=''>
                        Contact Us
                    </Link>
                </div>
                <div className='flex items-center gap-x-8'>
                    {user ?
                        <div onClick={HandleOpen} className='flex p-2 border border-black rounded-lg cursor-pointer'>
                            <CiUser size={24} color='#101042' />
                        </div>
                        :
                        <button onClick={HandleShowModal} className='items-center px-6 hidden md:flex py-2.5 border border-black rounded-lg'>
                            Get Started
                        </button>
                    }
                    <div className='flex md:hidden'>
                        {toggleMenu ? <RiCloseLine className='cursor-pointer' color="#101042" size={24} onClick={HandleToggleMenu} /> : <RiMenu3Line className='cursor-pointer' color="#101042" size={24} onClick={HandleToggleMenu} />}
                    </div>
                </div>
                {toggleMenu && (
                    <div ref={dropdownRef} className='absolute right-0 flex flex-col items-start justify-start p-8 transition-all duration-150 bg-white rounded-lg scale-up-center gap-y-3 top-24 sm:top-20'>
                        <div className='flex flex-col items-start gap-y-3'>
                            <Link to="/Resources" className=''>
                                Resources
                            </Link>
                            <Link to="/Pricing" className=''>
                                Pricing
                            </Link>
                            <Link to="/FAQ" className=''>
                                FAQ
                            </Link>
                            <Link to="/ContactUs" className=''>
                                Contact Us
                            </Link>
                        </div>
                        {!user &&
                            <span onClick={HandleShowModal} className="text-green-500 text-start w-full font-[400] hover:text-green-900 cursor-pointer bg-transparent">
                                Get Started
                            </span>
                        }
                    </div>
                )}
                {isOpen && (
                    <div ref={dropdownRef} className='absolute right-0 flex flex-col items-start justify-start p-8 transition-all duration-150 bg-white rounded-lg scale-up-center gap-y-3 top-24 sm:top-20'>
                        <div className='flex flex-col items-start gap-y-1'>
                            <span>Welcome, User</span>
                            {/* <span className='text-[#848AA1] text-[14px]'>{fields?.email}</span> */}
                        </div>
                        <span onClick={HandleLogout} className="text-red-500 text-start w-full font-[400] hover:text-red-900 cursor-pointer bg-transparent">
                            Logout
                        </span>
                    </div>
                )}
            </nav>
            {showModal && <AuthModal prop="login" setShowModal={setShowModal} />}
        </>
    )
}

export default Header