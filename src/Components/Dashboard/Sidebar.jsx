import { Link } from "react-router-dom";
import { TbChevronsLeft } from "react-icons/tb";
import { LuDoorOpen } from "react-icons/lu";

import { UseAuth } from "../../Contexts/Auth.Context";
import assets from "../../Assets/Index"

const Sidebar = ({ showSidebar, setShowSidebar }) => {
    const { logout } = UseAuth();

    return (
        <>
            {showSidebar &&
                <aside className="sidebar-container">
                    <div className="flex flex-col items-start w-full h-full gap-y-10">
                        <div className="flex items-center justify-between w-full p-5">
                            <Link to="/" className="">
                                <img src='/logo.png' alt="Logo" className="flex object-contain w-auto h-10 lg:hidden" />
                                <img src={assets.logoBlack} alt="Logo" className="hidden object-contain w-auto h-10 lg:flex" />
                            </Link>
                            <div className="flex justify-end lg:hidden">
                                <TbChevronsLeft className="cursor-pointer " size={24} onClick={() => { setShowSidebar(false) }} />
                            </div>
                        </div>
                        <div className="flex flex-col items-start">

                        </div>
                    </div>
                    <div onClick={() => { logout() }} className="flex flex-row items-start p-5 cursor-pointer gap-x-3">
                        <span className="text-lg ">Logout</span>
                        <LuDoorOpen size={24} />
                    </div>
                </aside>
            }
        </>
    )
}

export default Sidebar