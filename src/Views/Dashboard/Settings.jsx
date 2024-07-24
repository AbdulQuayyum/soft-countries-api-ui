import { useState, useEffect, useRef } from "react"
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LuCopy, LuBadgeInfo } from "react-icons/lu";
import { TbLoader3 } from 'react-icons/tb';
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";

import { DocumentTitle } from "../../Utilities/DocumentTitle"
import { FormatDateToInputValue, IsValidUrl } from "../../Utilities/Utilities";
import { ChangePassword } from "../../APIs/auth.api";
import { AddWebsite, RemoveWebsite, GenerateAPIKey, GetAPIKey, DeleteAPIKey, SetAPIKeyExpiration } from "../../APIs/user.api";

const SettingsPage = () => {
    DocumentTitle("Soft Countries API || Settings Page")
    const { userInfo } = useOutletContext();
    const [websites, setWebsites] = useState([]);
    const [newWebsite, setNewWebsite] = useState('');
    const [apiKey, setApiKey] = useState('*********************************************************');
    const [expirationDate, setExpirationDate] = useState(() => FormatDateToInputValue(userInfo.apiKeyExpiration));
    const [apiKeyUsed, setApiKeyUsed] = useState(userInfo.apiKeyUsed || false);
    const [tab, setTab] = useState(sessionStorage.getItem("activeTab") || "Security");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });
    const [fields, setFields] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" })
    const underlineRef = useRef(null);
    const tabsRef = useRef([]);

    const IsDisabled = !fields.confirmPassword || !fields.newPassword || !fields.oldPassword
    const accountTypeLimits = { basic: 1, pro: 3, volume: 10 };
    const maxWebsites = accountTypeLimits[userInfo.accountType] || 1;

    useEffect(() => {
        const activeTab = tabsRef.current.find(t => t.getAttribute('data-tab') === tab);
        if (activeTab && underlineRef.current) {
            underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
            underlineRef.current.style.left = `${activeTab.offsetLeft}px`;
        }
    }, [tab]);

    useEffect(() => {
        sessionStorage.setItem("activeTab", tab);
    }, [tab]);

    useEffect(() => {
        setWebsites(userInfo.allowedWebsites || []);
    }, [userInfo.allowedWebsites]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setApiKey("*********************************************************");
        }, 60000);

        return () => clearTimeout(timer);
    }, [apiKey, setApiKey]);

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

    const HandleAddWebsite = async () => {
        if (websites.length >= maxWebsites) {
            toast.error(`Your plan allows you to add only ${maxWebsites} websites.`);
            return;
        }

        if (!IsValidUrl(newWebsite)) {
            toast.error('Please enter a valid website URL.');
            return;
        }

        if (websites.includes(newWebsite)) {
            toast.error('This website is already added.');
            return;
        }

        const data = { username: userInfo.username, website: newWebsite };
        try {
            await AddWebsite(data);
            setWebsites([...websites, newWebsite]);
            setNewWebsite('');
            toast.success('Website added successfully.');
        } catch (error) {
            console.error('Error adding website:', error);
            toast.error('Failed to add website,' + error.response.data.error);
        }
    };

    const HandleRemoveWebsite = async (websiteToRemove) => {
        const data = { username: userInfo.username, website: websiteToRemove };
        try {
            await RemoveWebsite(data);
            setWebsites((prevWebsites) => {
                const updatedWebsites = prevWebsites.filter((website) => website !== websiteToRemove);
                return updatedWebsites;
            });
            toast.success('Website removed successfully.');
        } catch (error) {
            console.error('Error removing website:', error);
            toast.error('Failed to add website,' + error.response.data.error);
        }
    };

    const FetchAPIKey = async () => {
        setIsLoading(true);
        try {
            const { data } = await GetAPIKey({ username: userInfo.username });
            if (data.success) {
                setApiKey(data.data);
                setApiKeyUsed(true);
                toast.success('API Key fetched successfully.');
            } else {
                setApiKeyUsed(false);
            }
        } catch (error) {
            console.error('Error fetching API key:', error);
            toast.error('Failed to fetch API Key,' + error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    const HandleGenerateAPIKey = async () => {
        setIsLoading(true);
        try {
            const { data } = await GenerateAPIKey({ username: userInfo.username });
            if (data.success) {
                setApiKey(data.data);
                setApiKeyUsed(false);
                toast.success('API Key generated successfully.');
            }
        } catch (error) {
            console.error('Error generating API key:', error);
            toast.error('Error generating API key');
        } finally {
            setIsLoading(false);
        }
    };

    const HandleDeleteAPIKey = async () => {
        setIsLoading(true);
        try {
            await DeleteAPIKey({ username: userInfo.username });
            setApiKey("*********************************************************");
            setApiKeyUsed(false);
            toast.success('API Key deleted successfully.');
        } catch (error) {
            console.error('Error deleting API key:', error);
            toast.error('Failed to delete API Key,' + error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    const HandleSetExpirationDate = async () => {
        setIsLoading(true);
        try {
            await SetAPIKeyExpiration(({ username: userInfo.username, expirationDate: expirationDate }));
            toast.success('Expiration date set successfully');
        } catch (error) {
            console.error('Error setting expiration date:', error);
            toast.error('Failed to set API Key expiration date,' + error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

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
                        <div className="flex flex-col items-start mt-12 gap-y-4">
                            <span className="flex items-center text-base gap-x-3">  <LuBadgeInfo color='#000' size={16} />Be sure it has at least 8 characters long</span>
                            <span className="flex items-center text-base gap-x-3">  <LuBadgeInfo color='#000' size={16} />Be sure it includes at least one UPPERCASE letter</span>
                            <span className="flex items-center text-base gap-x-3">  <LuBadgeInfo color='#000' size={16} />Be sure it includes at least one lowercase letter</span>
                            <span className="flex items-center text-base gap-x-3">  <LuBadgeInfo color='#000' size={16} />Be sure it includes at least one digit</span>
                            <span className="flex items-center text-base gap-x-3">  <LuBadgeInfo color='#000' size={16} />Be sure it contains special characters</span>
                        </div>
                    </div>
                }
                {tab === "API Management" &&
                    <div className="flex flex-col items-start w-full gap-y-6">
                        <div className="flex flex-col items-start w-full gap-y-2">
                            <span className="text-lg font-bold">API Management</span>
                            <span className="text-base">Manage your API key and its expiration date here.</span>
                        </div>
                        <div className="flex flex-col items-start w-full gap-y-4">
                            <div className="flex flex-col w-full gap-y-2">
                                <span className="text-lg font-bold">API Key</span>
                                <div className="flex items-center w-full gap-x-4">
                                    <div className="relative w-full">
                                        <input type="text" value={apiKey} readOnly className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" />
                                        {!apiKeyUsed && (
                                            <button className="absolute inset-y-0 bottom-0 right-0 flex items-center px-4 text-[#2E2C34]">
                                                <CopyToClipboard onCopy={() => { toast.success('API Key copied successfully!') }} text={apiKey}>
                                                    <LuCopy className="cursor-pointer" color='#000' size={16} />
                                                </CopyToClipboard>
                                            </button>
                                        )}
                                    </div>
                                    {!apiKeyUsed && (
                                        <button onClick={FetchAPIKey} className="items-center px-10 flex py-2 md:py-[10px] border border-[#2E2C34] rounded-lg">
                                            Reveal
                                        </button>
                                    )}
                                    <button onClick={HandleDeleteAPIKey} className="items-center px-9 flex py-2 md:py-[10px] border border-red-500 text-red-500 rounded-lg">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col w-full my-2 gap-y-1">
                                <span className='text-lg font-bold'>Set Expiration Date</span>
                                <div className="flex items-center w-full gap-x-4">
                                    <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" />
                                    <button onClick={HandleSetExpirationDate} disabled={isLoading} className={`items-center px-10 flex py-2 md:py-[10px] border border-[#2E2C34] rounded-lg  ${isLoading ? ' cursor-wait' : ' cursor-pointer'}`}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end w-full mt-20 md:mt-24">
                                <button onClick={HandleGenerateAPIKey} disabled={isLoading} className={` justify-center flex items-center px-8 py-4 text-sm text-white transition-all bg-[#2E2C34] border border-[#2E2C34] rounded-md sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#2E2C34] hover:bg-transparent ${isLoading ? ' cursor-wait' : ' cursor-pointer'}`} >
                                    Generate New API Key
                                </button>
                            </div>
                            <div className="flex flex-col items-start mt-12 gap-y-4">
                                <span className="flex items-center text-base gap-x-3">
                                    <LuBadgeInfo color='#000' size={16} />
                                    Be sure to copy your API Key immediately, as it will be hidden after 60 seconds.
                                </span>
                                <span className="flex items-center text-base gap-x-3">
                                    <LuBadgeInfo color='#000' size={16} />
                                    Once an API Key is revealed after generation, it cannot be shown again due to security reasons.
                                </span>
                                <span className="flex items-center text-base gap-x-3">
                                    <LuBadgeInfo color='#000' size={16} />
                                    After setting an API Key's expiration date, it will no longer be valid for fetching data beyond that date.
                                </span>
                            </div>

                        </div>
                    </div>
                }
                {tab === "Accessibility" &&
                    <div className="flex flex-col items-start w-full gap-y-6">
                        <div className="flex flex-col items-start gap-y-2">
                            <span className="text-lg font-bold">Add a website</span>
                            <span className="text-base">Your <span className="capitalize ">{userInfo?.accountType} </span>plan allows you to add up to {maxWebsites} website(s).</span>
                        </div>
                        <div className="flex flex-col items-start w-full gap-y-2">
                            {websites.map((website, index) => (
                                <div key={index} className="flex items-center w-full gap-x-2">
                                    <input type="text" value={website} readOnly className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" />
                                    <button onClick={() => HandleRemoveWebsite(website)} className="items-center px-[16px] md:px-[26px] flex py-2 md:py-[10px] border border-red-500 text-red-500 rounded-lg" >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            {websites.length < maxWebsites && (
                                <div className="flex items-center w-full gap-x-2">
                                    <input type="text" value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)} className="w-full px-6 py-3 text-sm transition-all text-[#2E2C34] duration-500 border-[1px] border-[#D0D5DD] outline-none rounded-md disabled:cursor-not-allowed" placeholder="Enter website URL" />
                                    <button onClick={HandleAddWebsite} className="items-center px-10 flex py-2 md:py-[10px] border border-[#2E2C34] rounded-lg" >
                                        Add
                                    </button>
                                </div>
                            )}
                            {websites.length >= maxWebsites &&
                                <div className="flex items-center justify-center w-full py-12">
                                    <span className="text-lg font-bold">You've reacehd the maximum amount of {maxWebsites} website(s) that you can add on your <span className="capitalize ">{userInfo?.accountType} </span>plan</span>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default SettingsPage