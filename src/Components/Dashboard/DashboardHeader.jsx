import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { LuAlignLeft, LuCopy } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { UseAuth } from '../../Contexts/Auth.Context';
import { SwitchMode } from '../../APIs/user.api';

const DashboardHeader = ({ setShowSidebar, user, forceRefetch }) => {
    const { logout } = UseAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [testModeChecked, setTestModeChecked] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (user?.mode === "live") {
            setTestModeChecked(true);
        } else {
            setTestModeChecked(false);
        }
    }, [user?.mode]);

    const HandleToggleSidebar = () => {
        setShowSidebar((prevState) => !prevState);
    }

    const HandleSwitchMode = () => {
        SwitchMode({ username: user?.username, mode: (user?.mode === 'test') ? 'live' : 'test' });
    };


    const HandleToggleMode = () => {
        setTestModeChecked((prev) => !prev);
        HandleSwitchMode()

        setTimeout(() => {
            forceRefetch();
        }, 2000);
    }

    const HandleOpen = () => { setIsOpen((prev) => !prev) }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className={`dashboard-header-container ${user?.mode === "live" ? " !border-b-2 !border-b-green-500" : ""}`}>
            <div className="block lg:invisible" onClick={() => { HandleToggleSidebar() }}>
                <LuAlignLeft size={20} />
            </div>
            <div className="flex flex-row items-center gap-x-4">
                <label className="inline-flex items-center cursor-pointer me-5">
                    <span className="text-base font-extrabold text-[#2E2C34] me-3">Test Mode</span>
                    <input type="checkbox" checked={testModeChecked} onChange={HandleToggleMode} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    <span className="text-base font-extrabold text-[#2E2C34] ms-3">Live Mode</span>
                </label>
                <div onClick={HandleOpen} className='flex p-2 border border-[#2E2C34] rounded-lg cursor-pointer'>
                    <CiUser size={24} color='#101042' />
                </div>
            </div>
            {isOpen && (
                <div ref={dropdownRef} className='absolute right-0 flex flex-col items-start justify-start p-8 transition-all duration-150 bg-white rounded-lg scale-up-center gap-y-5 top-24 sm:top-20'>
                    <div className='flex flex-col items-start gap-y-2'>
                        <div className='flex items-center gap-x-2'>
                            <span className='text-[#667085] text-[14px]'>Welcome, {user?.username}</span>
                            <CopyToClipboard onCopy={() => { toast.success('Userrname copied successfully!') }} text={user?.username}>
                                <LuCopy className="cursor-pointer" color='#667085' size={14} />
                            </CopyToClipboard>
                        </div>
                        <span className='text-[#667085] text-[14px] flex items-center gap-x-2'>{user?.email}</span>
                    </div>
                    <span onClick={logout} className="text-red-500 text-start w-full font-[400] hover:text-red-900 cursor-pointer bg-transparent">
                        Logout
                    </span>
                </div>
            )}
        </nav>
    )
}

export default DashboardHeader;
