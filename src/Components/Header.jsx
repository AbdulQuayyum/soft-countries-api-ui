import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";

import { UseAuth } from "../Contexts/Auth.Context";
import assets from "../Assets/Index";

const Header = ({ setShowModal }) => {
    const { authState } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const user = authState.user;
    const [toggleMenu, setToggleMenu] = useState(false);
    const [activeTab, setActiveTab] = useState(location.pathname);
    const dropdownRef = useRef(null);
    const underlineRef = useRef(null);
    const tabsRef = useRef([]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setToggleMenu(false);
        }
    };

    useEffect(() => {
        if (toggleMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleMenu]);

    useEffect(() => {
        const path = location.pathname;
        setActiveTab(path);

        if (path !== '/') {
            const activeTabRef = tabsRef.current.find(t => t.getAttribute('data-tab') === path);
            if (activeTabRef && underlineRef.current) {
                underlineRef.current.style.width = `${activeTabRef.offsetWidth}px`;
                underlineRef.current.style.left = `${activeTabRef.offsetLeft}px`;
            }
        } else {
            if (underlineRef.current) {
                underlineRef.current.style.width = '0';
            }
        }
    }, [location.pathname]);

    const HandleShowModal = () => {
        setToggleMenu(false);
        setShowModal(true);
    };

    const HandleToggleMenu = () => {
        setToggleMenu(prev => !prev);
    };

    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <nav className="navbar-container">
            <Link to="/" className="flex items-center logo gap-x-4">
                <img src={assets.logoBlack} alt="Logo" className="object-contain w-auto h-10" />
            </Link>
            <div className="items-center hidden gap-2 md:flex gap-x-12">
                <div className="relative flex items-center justify-start w-full py-0 m-0 gap-x-12">
                    <span ref={underlineRef} className={`absolute bottom-0 h-[2px] -mb-[2px] bg-black transition-all duration-300`} style={{ left: 0, width: 0 }}></span>
                    {['/Resources', '/Pricing', '/FAQ', '/Status', '/ContactUs'].map((path, index) => (
                        <Link
                            key={path}
                            ref={el => tabsRef.current[index] = el}
                            data-tab={path}
                            to={path}
                            onClick={() => setActiveTab(path)}
                            className={isActive(path)}
                        >
                            {path.replace('/', '')}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-x-8">
                {user ? (
                    <div onClick={() => navigate("/Dashboard")} className="p-2 hidden md:flex border border-[#2E2C34] rounded-lg cursor-pointer">
                        <CiUser size={24} color="#101042" />
                    </div>
                ) : (
                    <button onClick={HandleShowModal} className="items-center px-6 hidden md:flex py-2.5 border border-[#2E2C34] rounded-lg">
                        Get Started
                    </button>
                )}
                <div className="flex md:hidden">
                    {toggleMenu ? (
                        <RiCloseLine className="cursor-pointer" color="#101042" size={24} onClick={HandleToggleMenu} />
                    ) : (
                        <RiMenu3Line className="cursor-pointer" color="#101042" size={24} onClick={HandleToggleMenu} />
                    )}
                </div>
            </div>
            {toggleMenu && (
                <div ref={dropdownRef} className="absolute right-0 flex flex-col items-start justify-start p-8 transition-all duration-150 bg-white rounded-lg scale-up-center gap-y-3 top-24 sm:top-20">
                    <div className="flex flex-col items-start gap-y-3">
                        <Link to="/Resources" className={`nav-link ${isActive('/Resources')}`}>Resources</Link>
                        <Link to="/Pricing" className={`nav-link ${isActive('/Pricing')}`}>Pricing</Link>
                        <Link to="/FAQ" className={`nav-link ${isActive('/FAQ')}`}>FAQ</Link>
                        <Link to="/Status" className={`nav-link ${isActive('/Status')}`}>Status</Link>
                        <Link to="/ContactUs" className={`nav-link ${isActive('/ContactUs')}`}>Contact Us</Link>
                    </div>
                    {user ? (
                        <Link to="/Dashboard" className="">Dashboard</Link>
                    ) : (
                        <span onClick={HandleShowModal} className="text-green-500 text-start w-full font-[400] hover:text-green-900 cursor-pointer bg-transparent">
                            Get Started
                        </span>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;