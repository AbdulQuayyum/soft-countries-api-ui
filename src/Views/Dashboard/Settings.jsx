import { useState, useEffect, useRef } from "react"
import toast from 'react-hot-toast';
import { TbLoader3 } from 'react-icons/tb';
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { ChangePassword } from "../../APIs/auth.api";

const SettingsPage = () => {
    DocumentTitle("Soft Countries API || Settings Page")
    const [tab, setTab] = useState("Security");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });
    const [fields, setFields] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" })
    const underlineRef = useRef(null);
    const tabsRef = useRef([]);

    useEffect(() => {
        const activeTab = tabsRef.current.find(t => t.getAttribute('data-tab') === tab);
        if (activeTab && underlineRef.current) {
            underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
            underlineRef.current.style.left = `${activeTab.offsetLeft}px`;
        }
    }, [tab]);

    function TogglePasswordVisibility(field) {
        setIsPasswordVisible((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    }


    function HandleChange(event) {
        const { name, value } = event.target;
        setFields((prevState) => ({ ...prevState, [name]: value }));
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const { oldPassword, newPassword, confirmPassword } = fields;

        try {
            if (newPassword !== confirmPassword) {
                toast.error("New password and confirm password do not match.");
                return;
            }
            await ChangePassword(oldPassword, newPassword);
            toast.success('Password changed successfully!');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast('Please log in again with your new password.');
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.error("Error:", error);
            if (error.response?.data?.errors) {
                const { errors } = error.response.data;
                if (!errors.isDigitsValid) {
                    toast.error("Password must contain digits.");
                }
                if (!errors.isLengthValid) {
                    toast.error("Password must be of sufficient length.");
                }
                if (!errors.isSpecialCharsValid) {
                    toast.error("Password must contain special characters.");
                }
                if (!errors.isUpperCaseValid) {
                    toast.error("Password must contain uppercase letters.");
                }
            } else if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const IsDisabled = !fields.confirmPassword || !fields.newPassword || !fields.oldPassword

    return (
        <div className='flex flex-col w-full px-4 mt-4 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>Settings Overview</span>
            </div>
            <div className="flex flex-col items-start gap-y-6">
                <div className="relative flex items-center justify-start w-full py-0 m-0 border-b-2 border-b-[#e5e7eb] gap-x-12">
                    <span ref={underlineRef} className="absolute bottom-0 h-[2px] -mb-[2px] bg-black transition-all duration-300" style={{ left: 0, width: 0 }}  ></span>
                    {['Security', 'API Management', 'Accessibility'].map((item, index) => (
                        <span key={item} ref={el => tabsRef.current[index] = el} data-tab={item} onClick={() => setTab(item)} className={`font-bold text-xl cursor-pointer py-3 ${tab === item ? "text-black" : "text-[#aaa]"}`} >
                            {item}
                        </span>
                    ))}
                </div>
                {tab === "Security" &&
                    <div className="flex flex-col items-start w-full gap-y-6">
                        <div className="flex flex-col items-start gap-y-2">
                            <span className="text-lg font-bold">Change Password</span>
                            <span className="text-base">Password must be a minimum of <b>8 characters</b>, must have at least a letter in <b>UPPERCASE</b> and <b>lowercase</b>, must have at least a <b>digit</b> and contains <b>special characters</b></span>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-y-6 gap-x-12 md:grid-cols-2">
                            <div className='flex flex-col w-full my-2 gap-y-1'>
                                <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>Old Password</span>
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible.oldPassword ? "text" : "password"}
                                        value={fields.oldPassword}
                                        name='oldPassword'
                                        onChange={HandleChange}
                                        placeholder="********"
                                        className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" />
                                    <button className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-[#2E2C34]" onClick={() => TogglePasswordVisibility('oldPassword')} >
                                        {isPasswordVisible.oldPassword ? (<PiEyeThin />) : (<PiEyeSlashThin />)}
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full my-2 gap-y-1'>
                                <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>New Password</span>
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible.newPassword ? "text" : "password"}
                                        value={fields.newPassword}
                                        name='newPassword'
                                        onChange={HandleChange}
                                        placeholder="********"
                                        className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" />
                                    <button className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-[#2E2C34]" onClick={() => TogglePasswordVisibility('newPassword')}  >
                                        {isPasswordVisible.newPassword ? (<PiEyeThin />) : (<PiEyeSlashThin />)}
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full my-2 gap-y-1'>
                                <span className='font-[400] text-[12px] sm:text-[14px] text-[#0C141D]'>Confirm New Password</span>
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible.confirmPassword ? "text" : "password"}
                                        value={fields.confirmPassword}
                                        name='confirmPassword'
                                        onChange={HandleChange}
                                        placeholder="********"
                                        className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" />
                                    <button className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-[#2E2C34]" onClick={() => TogglePasswordVisibility('confirmPassword')}  >
                                        {isPasswordVisible.confirmPassword ? (<PiEyeThin />) : (<PiEyeSlashThin />)}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center w-full mt-2'>
                            <button disabled={IsDisabled} onClick={HandleSubmit} className={`w-full justify-center flex items-center px-8 py-4 text-sm text-white transition-all bg-[#2E2C34] border border-[#2E2C34] rounded-md sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#2E2C34] hover:bg-transparent ${isLoading ? ' cursor-wait' : ' cursor-pointer'}`}>
                                {isLoading ? (<TbLoader3 size={24} className="animate-spin" />) : (<span className='font-[500] text-[14px]'>Change Password</span>)}
                            </button>
                        </div>
                    </div>

                }
                {tab === "API Management" &&
                    <div>
                        <span>API Management</span>
                    </div>
                }
                {tab === "Accessibility" &&
                    <div>
                        <span>Accessibility</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default SettingsPage