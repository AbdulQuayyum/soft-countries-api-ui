import { Link, useLocation } from "react-router-dom";
import { LuChevronsLeft, LuDoorOpen, LuLayoutGrid, LuSettings2, LuBarChartBig } from "react-icons/lu";

import { UseAuth } from "../../Contexts/Auth.Context";
import assets from "../../Assets/Index"

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const { logout } = UseAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <>
            {showSidebar &&
                <aside className="pb-8 sidebar-container">
                    <div className="flex flex-col items-start w-full h-full">
                        <div className="flex items-center justify-between w-full px-3 pt-2 pb-5 md:px-0 md:pl-5">
                            <Link to="/" className="">
                                <img src='/logo.png' alt="Logo" className="flex object-contain w-auto h-10 lg:hidden" />
                                <img src={assets.logoBlack} alt="Logo" className="hidden object-contain w-auto h-10 lg:flex" />
                            </Link>
                            <div className="flex justify-end lg:hidden">
                                <LuChevronsLeft className="cursor-pointer " size={20} onClick={() => { setShowSidebar(false) }} />
                            </div>
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <Link to="/Dashboard" className={` border-l-4 border-l-transparent flex items-center w-full p-4 gap-x-2 ${isActive('/Dashboard')}`}>
                                <span className="font-semibold md:block hidden text-lg text-[#2E2C34]">Dashboard</span>
                                <LuLayoutGrid color="#2E2C34" size={20} />
                            </Link>
                            <Link to="/Statistics" className={` border-l-4 border-l-transparent flex items-center w-full p-4 gap-x-2 ${isActive('/Statistics')}`}>
                                <span className="font-semibold md:block hidden text-lg text-[#2E2C34]">Statistics</span>
                                <LuBarChartBig color="#2E2C34" size={20} />
                            </Link>
                            <Link to="/Settings" className={` border-l-4 border-l-transparent flex items-center w-full p-4 gap-x-2 ${isActive('/Settings')}`}>
                                <span className="font-semibold md:block hidden text-lg text-[#2E2C34]">Settings</span>
                                <LuSettings2 color="#2E2C34" size={20} />
                            </Link>
                        </div>
                    </div>
                    <div onClick={() => { logout() }} className="flex flex-row items-center p-4 cursor-pointer gap-x-3">
                        <span className="font-semibold md:block hidden text-lg text-[#2E2C34]">Logout</span>
                        <LuDoorOpen size={20} />
                    </div>
                </aside>
            }
        </>
    )
}

export default Sidebar