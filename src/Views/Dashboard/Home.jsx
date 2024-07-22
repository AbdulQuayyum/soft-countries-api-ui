import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import { LuCopy } from "react-icons/lu";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { GetRecentActivities } from "../../Components/Index"
import { GetUserActivities } from '../../APIs/user.api';
import { DocumentTitle } from "../../Utilities/DocumentTitle"

const DashbaordPage = () => {
    DocumentTitle("Soft Countries API || Dashboard Page")
    const { userInfo } = useOutletContext();
    const [recentData, setRecentData] = useState([])

    const FetchData = async () => {
        try {
            const result = await GetUserActivities({ username: userInfo?.username, email: userInfo?.email });
            setRecentData(result.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        FetchData()
    }, [])

    return (
        <div className='flex flex-col w-full px-4 mt-4 gap-y-6'>
            <div>
                <span className='text-2xl font-bold lg:text-4xl'>Dashboard Overview</span>
            </div>
            <div className='flex flex-col w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
                <span className='flex items-center text-xl font-bold lg:text-2xl gap-x-2'>
                    Welcome, {userInfo.username}!
                    <CopyToClipboard onCopy={() => { toast.success('Userrname copied successfully!') }} text={userInfo?.username}>
                        <LuCopy className="cursor-pointer" color='#667085' size={20} />
                    </CopyToClipboard></span>
                <span className='text-base lg:text-lg'>You are currenly in the {userInfo?.mode} mode in your {userInfo?.accountType} plan</span>
            </div>
            {/* <div className='mt-4'>
                <span className='text-2xl font-bold lg:text-4xl'>Key Metrics</span>
            </div>
            <div className="flex flex-col items-center w-full gap-8 lg:items-stretch lg:flex-row">
                <div className='flex flex-col flex-1 w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
                    <span className='text-base lg:text-lg'>Total request this month</span>
                    <div className='flex items-center gap-x-2'>
                        <span className='text-xl font-bold lg:text-2xl'>Test: {userInfo?.callCount}</span>
                        <span className='text-xl font-bold lg:text-2xl'> Live: {userInfo?.testCallCount}</span>
                        <span className='text-xl font-bold lg:text-2xl'> Total: {userInfo?.testCallCount + userInfo?.callCount}</span>
                    </div>
                </div>
                <div className='flex flex-col flex-1 w-full p-6 bg-white rounded-lg shadow-lg gap-y-4'>
                    <span className='text-base lg:text-lg'>Remaining requests</span>
                    <div className='flex items-center gap-x-2'>
                        <span className='text-xl font-bold lg:text-2xl'>Test: {500 - userInfo?.callCount}</span>
                        <span className='text-xl font-bold lg:text-2xl'> Live: {userInfo?.accountType === "basic" ? 1000 - userInfo?.callCount : (userInfo?.accountType === "pro" ? 10000 - userInfo?.callCount : (userInfo?.accountType === "volume" ? 100000 - userInfo?.callCount : ""))}</span>
                    </div>
                </div>
            </div> */}
            <div className='mt-4'>
                <span className='text-2xl font-bold lg:text-4xl'>Recent Activities</span>
            </div>
            <GetRecentActivities data={recentData} />
        </div>
    )
}

export default DashbaordPage